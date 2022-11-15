import React from 'react';
import PropTypes from 'prop-types';

const RenderField = ({ input, placeholder, label, type, meta: { touched, error, invalid } }) => {
  return (
    <div className={`form-group ${touched && invalid ? 'has-error md-form' : 'md-form'}`}>
        <input {...input} className="form-control" type={type} value={input.value} placeholder={placeholder}/>
        <label className="control-label">{label}</label>
        <div className="help-block" />
        {touched && (error && <span className="error-danger">
          <i className="fa fa-exclamation-circle">{error}</i></span>) }
    </div>
  );
};

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;