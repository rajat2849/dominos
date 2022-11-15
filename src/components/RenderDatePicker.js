// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { FormGroup, Input, Label } from 'reactstrap';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';

// const RenderDatePicker = ({input, label, defaultValue, meta: {touched, error} }) => (
//   <div>
//     <DatePicker {...input}
//     	dateFormat="DD/MM/YYYY"
//     	placeholderText={label}
//     	selected={input.value ? moment(input.value) : null}
//     	showYearDropdown
//     	scrollableYearDropdown
//     	showMonthDropdown
//     	yearDropdownItemNumber={30}
//     />
//     {touched && error && <span className="error-danger">
//       <i className="fa fa-exclamation-circle">{error}</i></span>}
//   </div>
// );

// RenderDatePicker.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
// }

// export default RenderDatePicker;
