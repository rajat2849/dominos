import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Error from '../components/Error';
import { onlineOrderResponse , resetAlertBox, setAlert, fetchUser } from '../modules/error';


const mapStateToProps = (state) => {
  return({
  lang: state.i18nState.lang,
  app: state.app.app,
 	onlineOrderResponseData : state.Error.onlineOrderResponseData,
  showAlert: state.Error.showAlert,
  alertMessage: state.Error.alertMessage,
  isPgPaymentFailed : state.Error.isPgPaymentFailed,
  placingOrder: state.Error.placingOrder,
  user: state.Error.user,

	});
};

const mapDispatchToProps = (dispatch) => {
  return ({
  onlineOrderResponse: (order_id) =>dispatch(onlineOrderResponse(order_id)),
  resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
  fetchUser: () => dispatch(fetchUser()),
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
