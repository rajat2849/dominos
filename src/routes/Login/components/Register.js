// import React from "react";
// import PropTypes from "prop-types";
// import { Form } from "reactstrap";
// import { reduxForm, Field } from "redux-form";
// import { Row, Col, Label, Input, FormGroup, Button } from "reactstrap";

// import RenderField from "../../../../src/DashboardSubComponent/RenderField";
// import NormalizePhone from "components/NormalizePhone";
// import SubmitButtons from "components/SubmitButton";
// import DOB from "DashboardSubComponent/DateOfBirthComponent";

// const contact = ["Mobile", "Office", "Home"];

// const required = value => (value ? undefined : "Required");
// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined;
// const maxLength25 = maxLength(25);
// const maxLength11 = maxLength(11);
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined;
// const minValue9 = minValue(9);
// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? "Invalid email address"
//     : undefined;

// export const FirstName = props => {
//   // let error="";
//   // if(props.errors.Firstname){
//   //   error = props.errors.Firstname;
//   // }
//   return (
//     <div className="col-12">
//       <Field
//         name="Firstname"
//         className="form-control"
//         type="text"
//         component={RenderField}
//         label="First Name"
//         validate={[required, maxLength25]}
//       />
//     </div>
//   );
// };

// export const LastName = props => {
//   return (
//     <div className="col-12">
//       <Field
//         name="Lastname"
//         className="form-control"
//         type="text"
//         component={RenderField}
//         label="Last Name"
//         validate={[required, maxLength25]}
//       />
//     </div>
//   );
// };

// export const MobileNumber = props => {
//   let mobileOptions = ["Mobile", "Home", "Office"];
//   return (
//     <div className="row mx-0">
//       <div className="col-12 radio-box">
//         <Row>
//           {mobileOptions.map((option, index) => {
//             let check = false;
//             if (props.contactType === option) {
//               check = true;
//             }
//             return (
//               <Col key={index} className="col-4">
//                 <label>
//                   <Field
//                     name="MobileType"
//                     className="mr-2"
//                     component="input"
//                     type="radio"
//                     checked={check}
//                     value={option}
//                     onChange={e => props.contactNumberType(e.target.value, e)}
//                   />
//                   {option}
//                 </label>
//               </Col>
//             );
//           })}
//         </Row>
//       </div>
//       <Col className="col-12 col-sm-12 col-xl-12 mt-2">
//         <Row>
//           <Col className="text-center">
//             <Field
//               name="Number"
//               className="form-control"
//               type="tel"
//               component={RenderField}
//               label="Home or Office Number"
//               normalize={NormalizePhone}
//               validate={[required, maxLength11, minValue9]}
//             />
//           </Col>
//           {props.contactType === "Office" || props.contactType === "Home" ? (
//             <Col className="text-center col-3">
//               <Field
//                 name="Ext"
//                 className="form-control"
//                 type="text"
//                 component={RenderField}
//                 label="Ext"
//                 normalize={NormalizePhone}
//               />
//             </Col>
//           ) : null}
//         </Row>
//       </Col>
//     </div>
//   );
// };

// export const Email = props => {
//   return (
//     <div className="col-12">
//       <Field
//         name="Email"
//         className="form-control"
//         type="email"
//         component={RenderField}
//         label="Type your Email"
//         validate={[required, email]}
//       />
//     </div>
//   );
// };

// export const Password = props => {
//   return (
//     <div className="col-12">
//       <Field
//         name="Password"
//         className="form-control"
//         type="password"
//         component={RenderField}
//         label="Type Password"
//         validate={required}
//       />
//     </div>
//   );
// };

// export const Confirmpassword = props => {
//   return (
//     <div className="col-12">
//       <Field
//         name="Confirmpassword"
//         className="form-control"
//         type="password"
//         component={RenderField}
//         label="Type Confirm Password"
//         validate={required}
//       />
//     </div>
//   );
// };

// class RegisterForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       confirmDate: false
//     };
//     branch.logEvent("User Registeration Page", function(err) {
//       console.log(err);
//     });
//     this.checkDate = this.checkDate.bind(this);
//   }

//   checkDate(value) {
//     this.setState({
//       confirmDate: value
//     });
//   }

//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <Form className="pt-5 col-12 mb-3" onSubmit={handleSubmit}>
//         <Row>
//           <FirstName />
//           <LastName />
//           <MobileNumber {...this.props} />
//           <Email />
//           <Password />
//           <Confirmpassword />
//           <DOB checkDate={this.checkDate} />
//           <SubmitButtons
//             {...this.props}
//             submitLabel="Sign up"
//             className="btn theme-btn mx-auto mt-4 col-4"
//             submitting={this.props.submitting}
//             disabled={!this.state.confirmDate}
//           />
//           <SubmitButtons
//             submitLabel="Sign up with Facebook"
//             className="btn facebook-btn mx-auto mt-4"
//             submitting={this.props.submitting}
//           />
//         </Row>
//       </Form>
//     );
//   }
// }

// RegisterForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   submitting: PropTypes.bool
// };
// RegisterForm = reduxForm({
//   form: "login"
// })(RegisterForm);

// export default RegisterForm;
