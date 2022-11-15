import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import MyAccount from '../components/MyAccount';
import { validate } from '../components/Validations';
import { setContactType, updateLoginInfo, updateCustomer, resetAlertBox,setAlertMeassage } from '../modules/myAccount';
import { sentOrderVeriOtp, verifyOrderVeriOtp , sentOrderPlacedStatus } from '../../ViewCart/modules/ViewCart';
import { getLocalStorage } from 'components/Helpers';

const customerFormValues = (state) => {
  let formData = getLocalStorage('user');
  let registerFormData = getLocalStorage('receivedLoginDetail');
  let Dob = new Date(registerFormData.dob);
  Dob = Dob.getDate()+'/' + (Dob.getMonth()+1) + '/'+Dob.getFullYear();
   if (typeof formData !== 'undefined') {
    return {
      Firstname: formData.firstname,
      Lastname: formData.lastname,
      Email: formData.email,
      Number: formData.phoneNumber,
      extPhoneNumber: formData.phoneNumber,
      Ext: formData.contact_ext,
      MobileType: formData.contact_type,
      Dob: Dob
    };
  }
};

const mapStateToProps = (state) => {
  return({
    lang: state.i18nState.lang,
  	contactType: state.MyAccount.contactType,
  	updating: state.MyAccount.updating,
  	updatedLoginInfo: state.MyAccount.updatedLoginInfo,
  	updatedCustomer: state.MyAccount.updatedCustomer,
  	initialValues: customerFormValues(state),
    showAlert: state.MyAccount.showAlert,
    alertMessage: state.MyAccount.alertMessage,
    orderPlaceStatus : state.viewCart.orderPlaceStatus,
  });
};

const mapDispatchToProps = (dispatch) => {
	return ({
		setContactType: (contactType) => dispatch(setContactType(contactType)),
		updateLoginInfo: (values) => dispatch(updateLoginInfo(values)),
		updateCustomer: (values) => dispatch(updateCustomer(values)),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    setAlertMeassage : (status, message) => dispatch(setAlertMeassage(status,message)),
    sentOrderVeriOtp : (data) => dispatch(sentOrderVeriOtp(data)),
    verifyOrderVeriOtp : (data) => dispatch(verifyOrderVeriOtp(data)),
    sentOrderPlacedStatus : (value) => dispatch(sentOrderPlacedStatus(value))
	});
};


let MyAccountReduxForm = reduxForm({
  form: 'MyAccount',
  validate
})(MyAccount);

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountReduxForm);