import React from 'react';
import PropTypes from 'prop-types';
import OTPInput, { ResendOTP } from "otp-input-react";
import "./renderStyle.scss"

const RenderField = ({ input, placeholder,label, type, meta: { touched, error, invalid }, otp, setOtp }) => {
  let displayField;
  switch(type) {
    case "otp" : {
      displayField =  (
        <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
          <label  className="control-label">{}</label>
          <div>
          <OTPInput className="otp-input-root" value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />
          </div>
        </div>
      )
      break;
    }

    default : {
      displayField =  ( 
        <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
          <label  className="control-label">{}</label>
          <div>
            <input {...input} className="form-control" placeholder={label} type={type} value={input.value}  placeholder={placeholder}/>
            <div className="help-block" />
            {touched && (error && <span className="error-danger">
              <i className="fa fa-exclamation-circle">{error}</i></span>) }
          </div>
        </div>
      )
    }
  }
  return displayField;
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;
