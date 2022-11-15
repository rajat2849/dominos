import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ResetPassword from '../components/ResetPassword';
import {resetPassword, resetAlertBox} from '../modules/reset';
import { validate } from '../components/ResetPasswordValidation';
import { loadingImage } from '../../../store/app';

const mapStateToProps = (state) => {
	return({
		showAlert: state.Reset.showAlert,
		alertMessage: state.Reset.alertMessage,
		loader: state.app.loader,
	});
};

const mapDispatchToProps = (dispatch) => {
	return({
		resetPassword: (value) => dispatch(resetPassword(value)),
		resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
	});
};

let ResetPasswordReduxForm = reduxForm({
  form: 'ResetPassword',
  validate
})(ResetPassword);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordReduxForm);