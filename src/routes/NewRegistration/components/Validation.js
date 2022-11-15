export const validate = values =>{
  const errors = {};
  if(!values.Firstname) {
    errors.Firstname = 'Required';
  }
  if (!values.Firstname || values.length === 0 || !values.Firstname.trim()) {
    errors.Firstname = 'First Name can`t be blank';
  }
  if(values.Firstname && values.Firstname.length >= 25){
    errors.Firstname = 'Not more than 25 characters';
  }
  if(!values.Lastname) {
    errors.Lastname = 'Required';
  }
  if (!values.Lastname || values.length === 0 || !values.Lastname.trim()) {
    errors.Lastname = 'Last Name can`t be blank';
  }
  if(values.Lastname && values.Lastname.length >= 25){
    errors.Lastname = 'Not more than 25 characters';
  }
  if (!values.Email) {
    errors.Email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
    errors.Email = '  Invalid email';
  }
  if(!values.Password) {
    errors.Password = 'Required';
  }
  if(values.Password && values.Password.length<6){
    errors.Password = "Password should be atleast 6 characters long";
  }
  if (!values.Number) {
    errors.Number = 'Required';
  } 
  else if(!/^[0-9-+\/\s]{9,}$/i.test(values.Number)) {
    errors.Number = "Must be between 9-13 digits";
  }
  if (!values.Confirmpassword) {
    errors.Confirmpassword = 'Required';
  } else if(values.Password != values.Confirmpassword) {
    errors.Confirmpassword = 'Confirm password does not matched'
  }
  // if(values.Number && values.Number >13 ){
  //   errors.Number = "Must be between 9-13 digits"
  // }
  // if (!values.Dob) {
  //   errors.Dob = '!Required';
  // }
  // if (!values.ActivationCode) {
  //   errors.ActivationCode = '!Required';
  // }
  return errors;
}

export default validate;