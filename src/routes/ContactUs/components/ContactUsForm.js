import React from 'react';
import {Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'reactstrap';

import RenderField from 'DashboardSubComponent/RenderField';
import SubmitButtons from 'components/SubmitButton';
import MyStoreList from '../../../DashboardSubComponent/MyStoreList';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {browserHistory} from 'react-router';
import { Url } from 'config/Config';


const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} digits or less` : undefined
const maxLength25 = maxLength(25)
const maxLength16 = maxLength(16)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} digits or more` : undefined
export const minLength9 = minLength(9)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue13 = minValue(13)

const normalizePhone = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");

  if (onlyNums.length > 16) {
    return onlyNums.slice(0, 16);
  } else {
    return onlyNums;
  }
};

export const MessageSubject = (props) => {

	return (
		<div>
			<Field
        name='Subject'
        className='form-control'
        type='text'
        component={RenderField}
        validate={required}
        placeholder="Type your Subject"
      />
      <div className='alert-danger f-14'></div>
		</div>
	)
}

export const TypeOfMessage = (props) => {

  return (
		<div>
          <Field
            name='Message'
            className='form-control'
            type='text'
            component={RenderField}
            validate={required}
            placeholder="Type your Message"
          />
      <div className='alert-danger f-14'></div>
		</div>
	)
}

export const Name = (props) => {

	return (
		<div>
      <Field
        name='Name'
        className='form-control'
        type='text'
        component={RenderField}
        validate={[required,maxLength25]}
        placeholder="Type your Name"
      />
      <div className='alert-danger f-14'></div>
		</div>
	)
}

export const EmailAddress = (props) => {

  return (
		<div>
      <Field
        name='Email'
        className='form-control'
        type='text'
        component={RenderField}
        validate={[required,email]}
        placeholder="Type your Email"
      />
      <div className='alert-danger f-14'></div>
		</div>
	)
}

export const PhoneNumber = (props) => {

  return (
		<div>
      <Field
        name='Number'
        className='form-control'
        type='tel'
        component={RenderField}
        validate={[required,number,maxLength16,minLength9]}
        placeholder="Type your PhoneNumber"
         normalize={normalizePhone}
      />
      <div className='alert-danger f-14'></div>
		</div>
	)
}

export const TypeYourAddress = (props) => {

  return (
		<div>
          <Field
            name='Address'
            className='form-control'
            type='textarea'
            component={RenderField}
            validate={required}
            placeholder="Type your Address"
          />

      <div className='alert-danger f-14'></div>
		</div>
	)
}

class ContactUsForm extends React.Component {
	constructor(props) {
		super(props);
     this.state = {
      modal: true,
      backdrop:false
    };
    this.toggle = this.toggle.bind(this);
	}

    toggle() {
    this.setState({
      modal: false,
    });
    browserHistory.push(Url.DASHBOARD)
  }
	render() {
    const {handleSubmit} = this.props;
		return(
			<form className="row mx-0" onSubmit={handleSubmit}>
		    <div className="col-12 pt-0">
         {this.props.showAlert === true && this.props.alertMessage === "Your message has been successfully sent! Thank you for your valuable feedback." && 
       <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle} className={`selected-store-modal modal-dialog-center ${this.props.className}`} backdrop={this.state.backdrop}>
          <ModalBody>
            <div className='col-12 d-flex'>
              <p>Thank you for your valuable feedback</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle} color=' ' className='theme-btn big-btn col-12'>OK</Button>
          </ModalFooter>
        </Modal>}
		    	<MessageSubject 
            error={this.props.fieldError}
          />
		    	<TypeOfMessage 
            error={this.props.fieldError}
          />
		    	<MyStoreList
            storeList = {this.props.storeList}
          />
			    <Name 
            error={this.props.fieldError}
          />
			    <EmailAddress 
            error={this.props.fieldError}
          />
			    <PhoneNumber 
            error={this.props.fieldError}
          />
			    <TypeYourAddress 
            error={this.props.fieldError}
          />
          <div className='col-12 text-center px-0'>
            <SubmitButtons
              submitLabel='Submit'
              className='my-3 theme-btn big-btn mx-auto col'
              onClick={this.props.submitting}
            />
		      </div>
		    </div>
	    </form>
		)
	}
}

ContactUsForm = reduxForm ({
  form: 'ContactUsForm',
}) (ContactUsForm);

export  default ContactUsForm;