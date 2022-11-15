import React from 'react';
import { Row, Col, Form, ModalBody, ModalFooter } from 'reactstrap';
import { Field } from 'redux-form';
import RenderField from 'DashboardSubComponent/RenderField';
import Alert from "../../../components/Alert";
import PropTypes from 'prop-types';

// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email address'
//     : undefined
// const required = value => (value || typeof value === 'number' ? undefined : 'Required')

class ForgotPasswordActivation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    email: '',
    isDisabled: true
    }
    this.getEmail = this.getEmail.bind(this);
    this.sendMail = this.sendMail.bind(this);
    // branch.logEvent(
    //  "Forgot Password",
    //  function(err) { console.log(err); }
    // )
  }

  getEmail(e) {
    let email = e.target.value;
    this.setState({email: email})
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
      this.setState({isDisabled: false});
    } else{
      this.setState({isDisabled: true});
    }
  }

  sendMail() {
    this.props.handleModal();
    let email = this.state.email;
    this.props.loadingImage(true);
    this.props.userForgotPassword(email);
    this.setState({
      email: ""
    },() => this.props.toggle());
    // if(this.props.userForgotPassword == ""){
    //   this.props.toggle()
    // }
  }

  render(){
    return (
      <div>
        <ModalBody className='p-0'>
          <div className='col-12 px-0'>
            <Row>
              <div className='mt-3 mb-0 forgot-wrapper'>
                <div className='col-12 forgot-box'>
                  <h4 className='theme-text col-12  text-center'><span>{this.context.t('Forgot Password')}</span></h4>
                  <p className='my-3 col-12 text-center item-description'>{this.context.t('Please enter your email. You will receive a link to reset password')}</p>
                  {this.props.setAlert == true && <Alert />}
                  <form className='mt-2'>
                    <div className='col-12 py-3'>
                      <Row>
                        <Col className='col-12'>
                          <input
                            name='mail'
                            className='form-control'
                            type='email'
                            component='input'
                            label="Enter Email"
                            value={this.state.email}
                            onChange={(e) => this.getEmail(e)}
                            placeholder="Enter email"
                          />
                        </Col>
                      </Row>
                    </div>
                  </form>
                </div>
              </div>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter className='forgot-box pt-0 pb-0'>
          <div className='col-12 text-center py-2'>
            <Row>
              <Col className='col-6'>
                <button className="col-12 bdr-theme-btn text-center my-1 text-uppercase f-14 cancel-btn" onClick={this.props.toggle}>{this.context.t('Cancel')}</button>
              </Col>
              <Col className='col-6'>
                <button
                  type='submit'
                  className="btn theme-btn big-btn col-12 text-center my-1 text-uppercase f-14"
                  onClick={this.sendMail}
                  disabled={this.state.isDisabled}
                  >{this.context.t('Submit')}</button>
              </Col>
            </Row>
          </div>
        </ModalFooter>
      </div>
    );
  };
}

ForgotPasswordActivation.propTypes = {

};

ForgotPasswordActivation.contextTypes = {
  t: PropTypes.func.isRequired
}

export default ForgotPasswordActivation;
