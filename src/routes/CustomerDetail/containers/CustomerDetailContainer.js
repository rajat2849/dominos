import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import CustomerDetail from '../components/CustomerDetail';
import { setMobileExtension } from '../modules/customerDetail';
import  { validate } from '../components/Customer/CustomerFormValidation';
import  { getLocalStorage } from 'components/Helpers';
import { loadingImage } from '../../../store/app';

const customerFormValues = (state) => {
  let formdata = getLocalStorage('user');
  formdata.contact_number = formdata.phoneNumber;
  var ext = formdata.contact_ext;
  if((formdata.contact_ext === null) || (formdata.contact_ext === 'undefined')) {
    ext = "";
  }
  if (typeof formdata !== 'undefined') {
    return {
      firstname: formdata.firstname,
      lastname: formdata.lastname,
      email: formdata.email,
      extPhoneNumber: formdata.contact_number,
      phoneNumber: formdata.contact_number,
      ext: ext,
      extname: formdata.contact_type
    };
  }
};

const mapStateToProps = (state) => {
  return({
    app: state.app.app,
    loader: state.app.loader,
    lang: state.i18nState.lang,
    selectedExtension: state.CustomerDetail.selectedExtension,
    user: state.user.user,
    initialValues: customerFormValues(state)
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    loadingImage: (status) => dispatch(loadingImage(status)),
    setMobileExtension: (extension) => dispatch(setMobileExtension(extension))
  });
};

let CustomerDetailReduxForm = reduxForm({
  form: 'CustomerDetailForm',
  enableReinitialize: true,
  validate
})(CustomerDetail);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailReduxForm);
