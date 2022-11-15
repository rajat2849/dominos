import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ContactUs from '../components/ContactUs';
import { validate } from '../components/ContactUsValidation';
import { sendFeedback, fetchStoreList, resetAlertBox } from '../modules/contactUs';
import { loadingImage } from '../../../store/app';

const mapStateToProps = (state) => {
	return({
		lang: state.i18nState.lang,
		sending: state.ContactUs.sending,
		error: state.ContactUs.error,
		feedbackDetail: state.ContactUs.feedbackDetail,
		fetching: state.ContactUs.fetching,
		storeList: state.ContactUs.storeList,
		showAlert: state.ContactUs.showAlert,
		alertMessage: state.ContactUs.alertMessage,
		loader: state.app.loader,
	});
};

const mapDispatchToProps = (dispatch) => {
	return({
		loadingImage: (status) => dispatch(loadingImage(status)),
		sendFeedback: (values) => dispatch(sendFeedback(values)),
		fetchStoreList: () => dispatch(fetchStoreList()),
		resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
	});
};


let ContactUsReduxForm = reduxForm({
  form: 'ContactUsForm',
  validate
})(ContactUs);

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
