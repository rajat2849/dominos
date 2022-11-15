import React from 'react';
import PropTypes from 'prop-types';

import './CustomerDetail';

const RenderField = ({ input, label, type, meta: { touched, error, invalid } }) => {
  return (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      <label  className="control-label">{}</label>
      <div>
        <input {...input} className="form-control" placeholder={label} type={type} />
        <div className="help-block" />
        {touched && (error && <span className="error-danger">
          <i className="fa fa-exclamation-circle">{error}</i></span>) }
      </div>
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
