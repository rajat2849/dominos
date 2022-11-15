import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Order from '../components/Order';
import { fetchUser } from '../../../store/user';
import { deleteCart } from '../../../store/cart';
import { placingOrder } from '../../../store/newcart'
import { setPaymentOption, placeOrder, resetAlertBox, setLoginUserPaymentMethod, setOrderDetail, setAlert, getStoreTime, setPaymentOnline } from '../modules/order';

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchUser: () => dispatch(fetchUser()),
    placingOrder: (status) => dispatch(placingOrder(status)),
    setPaymentOption: (paymentOption, action) => dispatch(setPaymentOption(paymentOption, action)),
    placeOrder: (payload) => dispatch(placeOrder(payload)),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    setOrderDetail: () => dispatch(setOrderDetail()),
    setLoginUserPaymentMethod: () => dispatch(setLoginUserPaymentMethod()),
    setAlert: () => dispatch(setAlert()),
    getStoreTime: (store_code,day) => dispatch(getStoreTime(store_code,day)),
    setPaymentOnline: (order_id) => dispatch(setPaymentOnline(order_id)),
    onlineOrderResponse: (order_id) =>dispatch(onlineOrderResponse(order_id)),
    deleteCart: (cartItemIndex, cartSku) => dispatch(deleteCart(cartItemIndex, cartSku)),
  });
};

const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
    app: state.app.app,
    user: state.user.user,
    paymentOption: state.Order.paymentOption,
    placingOrder: state.Order.placingOrder,
    showAlert: state.Order.showAlert,
    alertMessage: state.Order.alertMessage,
    setStoreTimeDetailData: state.Order.setStoreTimeDetailData,
    paymentOnlineData : state.Order.paymentOnlineData,
    onlineOrderResponseData : state.Order.paymentOnlineData,
    isPgPaymentFailed : state.Order.isPgPaymentFailed,
  });
};

let orderReduxForm = reduxForm({
  form: 'order',
  enableReinitialize: true
})(Order);

export default connect(mapStateToProps, mapDispatchToProps)(orderReduxForm);
