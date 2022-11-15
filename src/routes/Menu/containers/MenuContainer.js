import { connect } from 'react-redux';
import Menu from '../components/Menu';
import {
  getPromotionList,
  getValueDealsList,
  getPizzaList,
  getSidesDessertsList,
  getBeverageList,
  getCurrentDay,
  // addToCart,
  getProductPrice,
  fetchConfig
} from '../modules/menu';

import { addToCart,updateCart ,getCartItems, deleteToCart ,removeCart, getCouponProductDetail} from '../../../store/newcart';
import { fetchAllTopings, resetProps, resetAlertBox } from "../../../store/toppings";
import { loadingImage } from "../../../store/app";
import { shakeIcon } from '../../../store/cart';
import {geCustomerOrders} from "../../Dashboard/modules/dashboard.js"
import {getUserNearestStore,
  setAddressDetails
} from "../../../store/findStore";
import {
  fetchSurveyAddress,
  setFormprops,
  setCurrentLocation,
  setAddressByLatLng,
  resetFormprops,
  resetSurveyAddressArray,
  addDeliveryAddress,
  setLoadingFlag,
  setUserNearestStore,
  setGeoUserAddress,
  setGeoCenterPoint,
  getCustomerDeliveryAddress
} from "../../NewServiceMethod/modules/servicemethod";

const mapStateToProps = (state) => {
  return({
    isShakeCartIcon: state.cart.isShakeCartIcon,
    lang: state.i18nState.lang,
    app: state.app.app,
    loader: state.app.loader,
    currentDay: state.Menu.currentDay,
    promotionList: state.Menu.promotionList,
    valueDealsList: state.Menu.valueDealsList,
    pizzaList: state.Menu.pizzaList,
    sidesDessertList: state.Menu.sidesDessertList,
    beverageList: state.Menu.beverageList,
    isPromotionFetched: state.Menu.isPromotionFetched,
    isValueDealsFetched: state.Menu.isValueDealsFetched,
    isPizzaFetched: state.Menu.isPizzaFetched,
    isSideDessertFetched: state.Menu.isSideDessertFetched,
    isBeverageFetched: state.Menu.isBeverageFetched,
    cartProducts: state.myCart.cartProducts,
    couponProduct: state.myCart.couponProduct,
    fetching: state.myToppings.fetching,
    error: state.myToppings.error,
    allToppings: state.myToppings.allToppings,
    defaultToppings: state.myToppings.defaultToppings,
    showAlert: state.myToppings.showAlert,
    alertMessage: state.myToppings.alertMessage,
    showLoader : state.myCart.showLoader,
    config:state.Menu.config,
    configuration:state.Menu.configuration,
    storeList: state.findStore.storeList,
    loaderFlag: state.ServiceMethod.loaderFlag,
    fetching: state.findStore.fetching,
    fetchDeliveryAddress: state.ServiceMethod.fetchDeliveryAddress,
    surveyAddress: state.ServiceMethod.surveyAddress,
    deliveryAddress: state.ServiceMethod.deliveryAddress,
    showDeliveryForm: state.ServiceMethod.showDeliveryForm,
    isSelectValue: state.ServiceMethod.isSelectValue,
    selectedValue: state.ServiceMethod.selectedValue,
    error: state.ServiceMethod.error,
    currentLocation: state.ServiceMethod.currentLocation,
    centerPoint: state.ServiceMethod.centerPoint,
    markers: state.findStore.markers,
    userAddress: state.ServiceMethod.userAddress,
    storeDetail: state.ServiceMethod.storeDetail,
    userCurrentAreaId: state.findStore.userCurrentAreaId,
    surveyAddressFetching: state.ServiceMethod.fetching,
    showAlert: state.ServiceMethod.showAlert,
    customerAddress: state.ServiceMethod.customerAddress,
    alertMessage: state.ServiceMethod.alertMessage,
    userAddressHeading: state.ServiceMethod.userAddressHeading,
    deliveryAddress: state.findStore.deliveryAddress,
    takeawayAddress: state.findStore.takeawayAddress,
    activeBtn: state.findStore.activeBtn,
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    loadingImage: (status) => dispatch(loadingImage(status)),
    deleteToCart: (product , state) => dispatch(deleteToCart(product , state)),
    addToCart: (category,item , state, product,edit,toppings) => dispatch(addToCart(category,item , state, product,edit,toppings)),
    removeCart: (category,item , state, product,edit,toppings) => dispatch(removeCart(category,item , state, product,edit,toppings)),
    updateCart: (category,item , state, product) => dispatch(updateCart(category,item , state, product)),
    getPromotionList: () => dispatch(getPromotionList()),
    getValueDealsList: () => dispatch(getValueDealsList()),
    getPizzaList: () => dispatch(getPizzaList()),
    getSidesDessertsList: () => dispatch(getSidesDessertsList()),
    getBeverageList: () => dispatch(getBeverageList()),
    getCurrentDay: () => dispatch(getCurrentDay()),
    fetchAllTopings: (defaultToppings) => dispatch(fetchAllTopings(defaultToppings)),
    resetProps: () => dispatch(resetProps()),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    getCouponProductDetail: (sku) => dispatch(getCouponProductDetail(sku)),
    getCartItems: (customer_id) => dispatch(getCartItems(customer_id)),
     geCustomerOrders:(id) =>dispatch(geCustomerOrders(id)),
    fetchConfig:() =>dispatch(fetchConfig()),
    setUserNearestStore: (lat, lng,callback,item) => dispatch(setUserNearestStore(lat, lng,callback,item)),
    getCustomerDeliveryAddress: (customer_id) => dispatch(getCustomerDeliveryAddress(customer_id)),
    fetchSurveyAddress: (values) => dispatch(fetchSurveyAddress(values)),
    setFormprops: (values) => dispatch(setFormprops(values)),
    setCurrentLocation: (values) => dispatch(setCurrentLocation(values)),
    addDeliveryAddress: (userSelectedAddress) => dispatch(addDeliveryAddress(userSelectedAddress)),
    setUserNearestStore: (lat, lng,callback,item) => dispatch(setUserNearestStore(lat, lng,callback,item)),
    setLoadingFlag: (status) => dispatch(setLoadingFlag(status)),
    setGeoUserAddress: (address,addressHeading) => dispatch(setGeoUserAddress(address,addressHeading)),
    setGeoCenterPoint: (centerPoint) => dispatch(setGeoCenterPoint(centerPoint)),
    setAddressByLatLng: (lat, lng) => dispatch(setAddressByLatLng(lat, lng)),
    resetFormprops: () => dispatch(resetFormprops()),
    resetSurveyAddressArray: () => dispatch(resetSurveyAddressArray()),
    getUserNearestStore: (lat,lang) => dispatch(getUserNearestStore(lat,lang)),
    setAddressDetails: (address_details, isActive) => dispatch(setAddressDetails(address_details, isActive))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
