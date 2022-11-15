import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Register from '../components/Register';
import {
  registerForm,
  resetRegisterForm,
  setContactType,
  userRegistration,
  resetVerifyForm,
  resetAlertBox,
  getForgotAlert,
  Recaptcha
} from '../modules/register';
import { loadingImage } from "../../../store/app";
import  { validate } from '../components/Validation';
import { getCartItems } from '../../../store/cart';

const mapStateToProps = (state) => {
  return({
    showRegisterForm: state.Register.showRegisterForm,
    showFacebookForm: state.Register.showFacebookForm,
    contactType: state.Register.contactType,
    fetching: state.Register.fetching,
    mail: state.Register.mail,
    verifying: state.Register.verifying,
    userRegistrationDetail: state.Register.userRegistrationDetail,
    showAlert: state.Register.showAlert,
    alertMessage: state.Register.alertMessage,
    forgotAlert : state.Register.forgotAlert,
    forgotMessage : state.Register.forgotMessage,
    recaptcha:state.Register.recaptcha
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    registerForm: () => dispatch(registerForm()),
    resetRegisterForm: () => dispatch(resetRegisterForm()),
    setContactType: (contactType) => dispatch(setContactType(contactType)),
    userRegistration: (values) => dispatch(userRegistration(values)),
    accountVerification: (values) => dispatch(accountVerification(values)),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    getCartItems: (customer_id) => dispatch(getCartItems(customer_id)),
    Recaptcha:(recaptcha) =>dispatch(Recaptcha(recaptcha))
  });
};

let RegisterReduxForm = reduxForm({
  form: 'Register',
  validate
})(Register);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReduxForm);


