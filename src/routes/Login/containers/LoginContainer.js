import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Login from "../components/Login";
import { validate } from "../components/Validation";
import {
  loggedIn,
  facebookForm,
  setContactType,
  userForgotPassword,
  resetAlertBox,
  getForgotAlert,
  setAlertMeassage,
  Recaptcha
} from "../modules/login";
import { loadingImage } from "../../../store/app";
import { getCartItems } from "../../../store/cart";

const mapStateToProps = state => {
  return {
    lang: state.i18nState.lang,
    loader: state.app.loader,
    showFacebookForm: state.Login.showFacebookForm,
    contactType: state.Login.contactType,
    fetching: state.Login.fetching,
    loginDetail: state.Login.loginDetail,
    mail: state.Login.mail,
    verifying: state.Login.verifying,
    accountVerifiedDetail: state.Login.accountVerifiedDetail,
    userRegistrationDetail: state.Login.userRegistrationDetail,
    activationCodeDetail: state.Login.activationCodeDetail,
    showAlert: state.Login.showAlert,
    alertMessage: state.Login.alertMessage,
    forgotAlert: state.Login.forgotAlert,
    forgotMessage: state.Login.forgotMessage,
    recaptcha: state.Login.recaptcha
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadingImage: status => dispatch(loadingImage(status)),
    loggedIn: values => dispatch(loggedIn(values)),
    facebookForm: () => dispatch(facebookForm()),
    setContactType: contactType => dispatch(setContactType(contactType)),
    userForgotPassword: email => dispatch(userForgotPassword(email)),
    resetAlertBox: (showAlert, message) =>
      dispatch(resetAlertBox(showAlert, message)),
    getCartItems: customer_id => dispatch(getCartItems(customer_id)),
    setAlertMeassage: (status, message) =>
      dispatch(setAlertMeassage(status, message)),
    Recaptcha: recaptcha => dispatch(Recaptcha(recaptcha))
  };
};

let LoginReduxForm = reduxForm({
  form: "Login",
  validate
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginReduxForm);
