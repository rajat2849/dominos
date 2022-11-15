import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, FormGroup ,Label ,Input} from 'reactstrap';
import PropTypes from 'prop-types';
import usecoupon from '../../../../public/newimages/usecoupon.png';
import CouponAlert from "./CouponAlert";
import { getLocalStorage, saveLocalStorage, removeLocalStorage } from '../../../components/Helpers';
import CouponAlertWrong from "./CouponAlertWrong";
import './NewDashboard.scss'

class CouponCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: '',
      showError: false,
      newError:false
    };

    this.toggle = this.toggle.bind(this);
    this.voucherCode = this.voucherCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
    this.handleNewError = this.handleNewError.bind(this);
    this.manageModules = this.manageModules.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  saveDeliveryAddressFromForm = () => {
    this.props.onSubmit(this.props.selectedValue)
  }

  manageModules(){
    this.voucherCode();
    setTimeout(() => {
      //this.props.toggle();

    }, 1000);
  }

  voucherCode(event) {
    if(this.state.value === ""){
      this.setState({
        showError : true
      });
    }
    else {
      this.props.setAlertMeassage(false,'')
      this.props.applyVoucherCode(this.state.value)
    }
  }
    
  handleNewError(){
    this.setState({
      newError : false
    })
    this.props.setAlertMeassage(false,'')
  }
  handleShowError(){
    this.setState({
      showError : false
    })
    this.props.setAlertMeassage(false,'')
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
      {
         this.state.showError && <CouponAlert showError={this.state.showError} setAlertMessage={this.props.setAlertMeassage} handleShowError={this.handleShowError}/>
       }
       {
        this.props.alertMessage==="Not Found" && <CouponAlertWrong newError={this.state.newError} setAlertMessage={this.props.setAlertMeassage} handleNewError={this.handleNewError}/>
       }
        
        <Modal isOpen={this.props.showForm}
         className="enter-coupon">
          <ModalBody className='pb-0'>
            {this.props.selectedValue !== undefined ? 
              <div className='col-12 d-flex'>
                <p>{this.props.selectedValue}</p>
              </div>
              :
              ''
            }
            <div className='col-12'>
              <FormGroup>
                <Label for="exampleEmail"> <img src={usecoupon} alt='' className='img-fluid'/> <span className='ml-2'>{this.context.t('ENTER COUPON')}</span></Label>
                <Input type="email" value={this.state.value} onChange={(e) => this.handleChange(e)} name="email" id="exampleEmail"/>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter className="border-top-0 pt-0 pb-2">  
            <Button onClick={() => this.props.toggle()} color=' ' className='bg-transparent coupon'>
              <span>{this.context.t('CANCEL')}</span>
            </Button>{' '}
            <Button onClick={() => this.manageModules()} color=' ' className='bg-transparent coupon'>
              <span>{this.context.t('YES')}</span>
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

CouponCodeForm.contextTypes = {
  t: PropTypes.func.isRequired
}

export default CouponCodeForm;