import { connect } from "react-redux";
import { fetchUser } from "../../../store/user";
//import { updateCart, deleteCart, resetCartAlertBox } from '../../../store/cart';
import ViewCart from "../components/ViewCart";
import { loadingImage } from "../../../store/app";
import {
  calculateLateOrderDateTime,
  setSelectedTimeState,
  resetAlertBox,
  applyVoucherCode,
  getCouponProductDetail,
  detailForm,
  setAlertMeassage,
  getPaymentMethod,
  setProps,
  fetchTimeStamp,
  getTaxData,
  setModal,
  getTaxMessage,
  getTaxMessageId,
  setDelivery,
  fetchConfig,
  sentOrderVeriOtp,
  verifyOrderVeriOtp,
  sentOrderPlacedStatus
} from "../modules/ViewCart.js";
import { geCustomerOrders } from "../../Dashboard/modules/dashboard"
import {
  getStoreTime,
  placeOrder,
  setPaymentOnline,
  placeOrderResponse,
  setLoginUserPaymentMethod,
  setOrderDetail
} from "../../Order/modules/order.js";
import {
  addToCart,
  deleteToCart,
  removeCart,
  getCartItems,
} from "../../../store/newcart";
import { fetchAllTopings, resetProps } from "../../../store/toppings";

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    setPaymentOnline: order_id => dispatch(setPaymentOnline(order_id)),
    updateCart: (cartItemIndex, cartSku, data) =>
      dispatch(updateCart(cartItemIndex, cartSku, data)),
    deleteCart: (cartItemIndex, cartSku) =>
      dispatch(deleteCart(cartItemIndex, cartSku)),
    calculateLateOrderDateTime: date =>
      dispatch(calculateLateOrderDateTime(date)),
    setSelectedTimeState: time => dispatch(setSelectedTimeState(time)),
    resetAlertBox: (showAlert, message) =>
      dispatch(resetAlertBox(showAlert, message)),
    resetCartAlertBox: (showAlert, message) =>
      dispatch(resetCartAlertBox(showAlert, message)),
    applyVoucherCode: code => dispatch(applyVoucherCode(code)),
    getCouponProductDetail: sku => dispatch(getCouponProductDetail(sku)),
    getStoreTime: (store_code, day) => dispatch(getStoreTime(store_code, day)),
    deleteToCart: (product, state) => dispatch(deleteToCart(product, state)),
    addToCart: (category, product, state, item, edit, toppings) =>
      dispatch(addToCart(category, product, state, item, edit, toppings)),
    removeCart: (category, product, state, item, edit, toppings) =>
      dispatch(removeCart(category, product, state, item, edit, toppings)),
    fetchAllTopings: defaultToppings =>
      dispatch(fetchAllTopings(defaultToppings)),
    resetProps: () => dispatch(resetProps()),
    placeOrder: payload => dispatch(placeOrder(payload)),
    placeOrderResponse: () => dispatch(placeOrderResponse()),
    setLoginUserPaymentMethod: () => dispatch(setLoginUserPaymentMethod()),
    setOrderDetail: orderDetail => dispatch(setOrderDetail(orderDetail)),
    sending: values => dispatch(send(values)),
    loadingImage: status => dispatch(loadingImage(status)),
    getCartItems: customer_id => dispatch(getCartItems(customer_id)),
    detailForm: value => dispatch(detailForm(value)),
    setAlertMeassage: (setAlert, message) =>
      dispatch(setAlertMeassage(setAlert, message)),
    getPaymentMethod: () => dispatch(getPaymentMethod()),
    getTaxData: () => dispatch(getTaxData()),
    setProps: key => dispatch(setProps(key)),
    fetchTimeStamp: timeStamp => dispatch(fetchTimeStamp(timeStamp)),
    getTaxMessage: () => dispatch(getTaxMessage()),
    getTaxMessageId: () => dispatch(getTaxMessageId()),
    setModal: modal => dispatch(setModal(modal)),
    //receivedTimeStamp : (timeStamp) => dispatch(receivedTimeStamp(timeStamp))
    setDelivery:delivery =>dispatch(setDelivery(delivery)),
    fetchConfig:() => dispatch(fetchConfig()),
    sentOrderVeriOtp : (data) => dispatch(sentOrderVeriOtp(data)),
    verifyOrderVeriOtp : (data) => dispatch(verifyOrderVeriOtp(data)),
    geCustomerOrders : (data) => dispatch(geCustomerOrders(data)),
    sentOrderPlacedStatus : (value) => dispatch(sentOrderPlacedStatus(value))
  };
};

const mapStateToProps = state => {
  return {
    lang: state.i18nState.lang,
    user: state.user.user,
    app: state.app.app,
    lang: state.i18nState.lang,
    date: state.ViewCart.date,
    time: state.ViewCart.time,
    selectedTime: state.ViewCart.selectedTime,
    showAlert: state.ViewCart.showAlert,
    alertMessage: state.ViewCart.alertMessage,
    applying: state.ViewCart.applying,
    voucherCodeDetail: state.ViewCart.voucherCodeDetail,
    error: state.ViewCart.error,
    processing: state.cart.processing,
    showCartAlert: state.cart.showAlert,
    alertCartMessage: state.cart.alertMessage,
    showAlert: state.myCart.showAlert,
    placing: state.myCart.placing,
    alertMessage: state.myCart.alertMessage,
    couponProduct: state.ViewCart.couponProduct,
    Order: state.Order,
    cartProducts: state.myCart.cartProducts,
    fetching: state.myToppings.fetching,
    error: state.myToppings.error,
    allToppings: state.myToppings.allToppings,
    defaultToppings: state.myToppings.defaultToppings,
    showAlert: state.myToppings.showAlert,
    alertMessage: state.myToppings.alertMessage,
    loader: state.app.loader,
    sending: state.ViewCart.sending,
    items: state.ViewCart.items,
    showLoader: state.myCart.showLoader,
    paymentMethods: state.ViewCart.paymentMethods,
    freeDelivery: state.ViewCart.freeDelivery,
    carryoutDelivery: state.ViewCart.carryoutDelivery,
    timeStamp: state.ViewCart.timeStamp,
    fetchingTimeStamp: state.ViewCart.fetchingTimeStamp,
    taxData: state.ViewCart.taxData,
    fetchingData: state.ViewCart.fetchingData,
    message: state.ViewCart.message,
    messageId: state.ViewCart.messageId,
    modal: state.ViewCart.modal,
    delivery:state.ViewCart.delivery,
    config:state.ViewCart.config,
    orderPlaceStatus : state.ViewCart.orderPlaceStatus,
    configuration:state.ViewCart.configuration,
    // app: state.app.app,
    // user: state.user.user,
    // paymentOption: state.Order.paymentOption,
    //placingOrder: state.Order.placingOrder,
    // showAlert: state.Order.showAlert,
    // alertMessage: state.Order.alertMessage,
    // setStoreTimeDetailData: state.Order.setStoreTimeDetailData,
    // paymentOnlineData : state.Order.paymentOnlineData,
    // onlineOrderResponseData : state.Order.paymentOnlineData,
    // isPgPaymentFailed : state.Order.isPgPaymentFailed,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
