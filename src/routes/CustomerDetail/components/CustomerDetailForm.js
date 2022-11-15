import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import renderField from './renderField';
import SubmitButtons from 'components/SubmitButton';

import './customerDetail.scss';
const validate = values => {
  const errors = {};
  if(!values.firstname) {
    errors.firstname = 'Required';
  }
  if(!values.lastname) {
    errors.lastname = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }
  if (!values.number) {
    errors.number = 'Required';
  } else if(!/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/i.test(values.number)) {
    errors.number = 'Invalid phone no';
  }
  return errors;
};

const contact = ['mobile','Office','Home'];

class CustomerDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="customer-detail col-xl-12 col-sm-12 main-wrapper content-wrapper">
        <h4 className='title text-center col-12 col-sm-12 col-xl-12 mb-0 py-3'><span>Customer detail</span></h4>
        <div className='col-xl-12 col-sm-12'>
          <Form inline className='customer-detail-form'  onSubmit={handleSubmit}>
            <div className='col-sm-6 col-6 form-group text-left p-1 mb-0'>
              <Field
                name="firstname"
                className="form-control"
                type="text"
                component={renderField}
                label="First Name"
              />
            </div>
            <div className='col-sm-6 col-6 form-group text-left p-1 mb-0'>
              <Field
                name="lastname"
                className="form-control"
                type="text"
                component={renderField}
                label="Last Name"
              />
            </div>
            <div className='col-sm-6 col-6 form-group text-left p-1 mb-3'>
              <Field
                name="contact_type"
                component="select"
                className="form-control"
                label="contact_type"
                
              >
                {contact.map((data, i) => {
                  return (
                    <option value={data} key={i}>{data}</option>
                  );
                })}
              </Field>
            </div>
            <div className='col-sm-6 col-6 form-group text-left p-1 mb-0'>
              <Field
                parse={value => Number(value)}
                name="number"
                className="form-control"
                type="number"
                component={renderField}
                label="Number"
              />
            </div>
            <div className='col-sm-12 col-12 form-group text-left p-1 mb-0'>
              <Field
                name="email"
                className="form-control"
                type="email"
                component={renderField}
                label="Email"
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CustomerDetailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'CustomerDetailForm',
  validate,
})(CustomerDetailForm);
