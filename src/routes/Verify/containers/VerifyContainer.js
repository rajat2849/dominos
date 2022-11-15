import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Verify from '../components/Verify';
import {
  accountVerification,
  resetVerifyForm,
  resendActivationCode,
  resetAlertBox,
  getForgotAlert,
  setAlertMeassage
} from '../modules/verify';
import {loggedIn} from '../../Login/modules/login';
import { loadingImage } from "../../../store/app";
import { getCartItems } from '../../../store/cart';

const mapStateToProps = (state) => {
  return({
    fetching: state.Verify.fetching,
    showVerifyForm: state.Verify.showVerifyForm,
    loginDetail: state.Verify.loginDetail,
    mail: state.Verify.mail,
    verifying: state.Verify.verifying,
    accountVerifiedDetail: state.Verify.accountVerifiedDetail,
    activationCodeDetail: state.Verify.activationCodeDetail,
    showAlert: state.Verify.showAlert,
    alertMessage: state.Verify.alertMessage,
    forgotAlert : state.Verify.forgotAlert,
    userRegistrationDetail: state.Verify.userRegistrationDetail,
    forgotMessage : state.Verify.forgotMessage
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    accountVerification: (values) => dispatch(accountVerification(values)),
    resetVerifyForm: () => dispatch(resetVerifyForm()),
    resendActivationCode: (mail) => dispatch(resendActivationCode(mail)),
    userForgotPassword: (email) => dispatch(userForgotPassword(email)),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    getCartItems: (customer_id) => dispatch(getCartItems(customer_id)),
    loggedIn: (values) => dispatch(loggedIn(values)),
    setAlertMeassage : (status, message) => dispatch(setAlertMeassage(status,message))
  });
};

let VerifyReduxForm = reduxForm({
  form: 'Verify',
})(Verify);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyReduxForm);


