import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from "redux-form";
import logo from "../../../../public/whatsapp.jpg";
import { getLocalStorage } from "components/Helpers";
import RenderField from "../../../components/RenderField";
import NewHeader from "../../../components/NewHeader";
import './ViewCart.scss'

class freeModal extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   modal: true,
   seconds : 120,
   timer : 0 , 
   optionList:[{id: 1 , name:'WhatsApp', slug:"whatsapp"}], 
   selectedOption:"", 
   otp: ''
  };
 }

 componentDidMount() {
   const {initialize } = this.props;
  const user = getLocalStorage('user');
  this.setState({user : user});
  initialize({email : user.email , mobile : user.phoneNumber});
 }

 /****************** Timer Code ********************************/

startTimer = (seconds , timer) => {
  if (timer == 0 && seconds > 0) {
    this.setState({timer : setInterval(this.countDown, 1000)})
  }
}

countDown = () => {
  const { seconds , timer } = this.state
  let remainSeconds = seconds - 1;
  this.setState({
    seconds: remainSeconds,
  });
  // Check if we're at zero.
  if (remainSeconds == 0) { 
    clearInterval(timer);
  }
}

/**************************************************/

// used to select verification method.

chooseVerificationMethod = (data) => {
  this.setState({selectedOption: data.slug});
  if(data.slug=== "whatsapp") {
    this.sentOtpToWhatsApp()
  }
}

// used to sent the otp at the time of place order.
sentOtpToWhatsApp = () => {
  const { sentOtp} = this.props;
  sentOtp();
  this.setState({seconds:120 , timer:0})
  this.startTimer(120 , 0)
}

 closeBtnHandler = () => {
  const { timer} = this.state;
  this.setState({modal : false});
  clearInterval(timer);
  this.props.closeBtnHandler();
 }


  render() {
    const { orderPlaceStatus , verifyOtp, phoneNumber } = this.props;
   const {seconds, optionList,  selectedOption, otp } = this.state;
   const user = getLocalStorage('user');
   return (
    <div>
      {selectedOption=== "" ? 
      (
        <Modal
          // isOpen={this.state.modal}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}
          className={`selected-store-modal modal-dialog-center ${this.props.className}`}
          backdrop={this.state.backdrop}
        >
        <ModalBody className="d-flex flex-column align-items-center">
          <p className='text-center'><b>Choose Verification Method</b></p>
        {optionList && optionList.map(item => {
          return( 
            <div id={item.id} className="listCard mb-1" onClick={() => this.chooseVerificationMethod(item)}>
              <Container>
                <Row>
                  <Col xs={3} className="d-flex align-items-center p-0 m-0">
                    <img src={logo} className="mx-auto appLogo" />
                  </Col>
                  <Col className="d-flex flex-column justify-content-center">
                    <p className='itemName p-0 m-0'>{item.name} to</p>
                    <p className='itemNumber p-0 m-0'>+62 {phoneNumber ? phoneNumber : user.phoneNumber}</p>
                  </Col>
                </Row>
              </Container>
            </div>
          )
        })}
        </ModalBody>
      </Modal> 
    ) : 
    (
    <div
      className="sidebar"
    >
     <NewHeader page="OTP Verification" goBackFunc = {() => this.closeBtnHandler()}/>
     <Container className='mt-5 text-center otpVerification'>
       <Row className="mt-5">
         <Col className="mt-5">
           <p className='p-0 mt-2'>We have send 6 digit code to your phone number Please input for verification your account.</p>
         </Col>
       </Row>
     </Container>
     <div className='d-flex justify-content-center mt-5'>
     <form onSubmit={this.props.handleSubmit(this.props.verifyOtp)}>
        <Field
          name="otp"
          component={RenderField}
          type="otp"
          placeholder="Enter otp"
          otp = {otp}
          setOtp= {(value) => this.setState({otp : value})}
        />
        {orderPlaceStatus === "invalidOtp" && (
        <p className='error'>Invalid otp</p>
        )}
      <Container className='mt-4 text-center otpVerification'>
       <Row>
         <Col>
           <p className='p-0'>Did not get OTP? {seconds=== 0 ? (<span  onClick={() => this.sentOtpToWhatsApp()}>Resend OTP</span>) : (<span>Resend in {seconds} secs</span>)}</p>
         </Col>
       </Row>
      </Container>
      <button
        className="my-3 theme-btn big-btn mx-auto col btn btn-"
        type="button" 
        onClick= {() => verifyOtp({email : user.email , mobile : phoneNumber ? phoneNumber :  user.phoneNumber , otp : otp})}
        disabled = {otp.length !== 6 ? true: false}
      >
        Verify
      </button>
      </form>
     </div>
    </div>
   )}
    </div>
  );
 }
}

freeModal.defaultProps ={
 modelFooter : true,
 closeBtnHandler:null
}

export default reduxForm({
  form: "verifyOrder"
})(freeModal);;
