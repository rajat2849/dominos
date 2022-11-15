import { connect } from "react-redux";
import Delivery from "../components/Delivery";
import {
    fetchSurveyAddress,
    setFormprops,
    setCurrentLocation,
    setAddressByLatLng,
    resetFormprops,
    resetSurveyAddressArray,
    addDeliveryAddress,
    setLoadingFlag,
    resetAlertBox,
    setUserNearestStore,
    setGeoUserAddress,
    setGeoCenterPoint,
    getCustomerDeliveryAddress,
    resetIsSelectedValue
    //receivedCoupon
} from "../modules/servicemethod";
import {getUserNearestStore, findStore, validateUserCurrentAddress, getStoreLocation, resetStoreLocations, resetNearestMarker, } from "../../../store/findStore";
import { loadingImage } from "../../../store/app";

const mapStateToProps = (state) => {
  return ({
    loaderFlag: state.ServiceMethod.loaderFlag,
    lang: state.i18nState.lang,
    app: state.app.app,
    loader: state.app.loader,
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
    storeLocations: state.findStore.storeLocations,
    storeDetail: state.ServiceMethod.storeDetail,
    userCurrentAreaId: state.findStore.userCurrentAreaId,
    surveyAddressFetching: state.ServiceMethod.fetching,
    showAlert: state.ServiceMethod.showAlert,
    customerAddress: state.ServiceMethod.customerAddress,
    alertMessage: state.ServiceMethod.alertMessage,
    userAddressHeading: state.ServiceMethod.userAddressHeading,
    nearesrStores: state.findStore.nearesrStores,
    nearestMarker: state.findStore.nearestMarker,
    getLocation:state.findStore.getLocation,
    fetchStore:state.findStore.fetchStore,
    //voucherCodeDetail: state.myCart.voucherCodeDetail,
    showLoader: state.ServiceMethod.showLoader,
  });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        loadingImage: (status) => dispatch(loadingImage(status)),
        fetchSurveyAddress: (values) => dispatch(fetchSurveyAddress(values)),
        setFormprops: (values) => dispatch(setFormprops(values)),
        resetFormprops: () => dispatch(resetFormprops()),
        resetSurveyAddressArray: () => dispatch(resetSurveyAddressArray()),
        map: (values) => dispatch(map(values)),
        setCurrentLocation: (values) => dispatch(setCurrentLocation(values)),
        findStore: (lat, lng, areaId,page) => dispatch(findStore(lat, lng, areaId, "delivery")),
        setAddressByLatLng: (lat, lng) => dispatch(setAddressByLatLng(lat, lng)),
        addDeliveryAddress: (userSelectedAddress) => dispatch(addDeliveryAddress(userSelectedAddress)),
        getStoreLocation: () => dispatch(getStoreLocation()),
        getUserNearestStore: (lat,lang) => dispatch(getUserNearestStore(lat,lang)),
        validateUserCurrentAddress: (lat, lng, areaData) => dispatch(validateUserCurrentAddress(lat, lng, areaData)),
        resetStoreLocations: () => dispatch(resetStoreLocations()),
        setUserNearestStore: (lat, lng,callback,item) => dispatch(setUserNearestStore(lat, lng,callback,item)),
        setLoadingFlag: (status) => dispatch(setLoadingFlag(status)),
        resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
        getNearestStores: (lat, lng, areaId,page) => dispatch(findStore(lat, lng, areaId, "storelocator")),
        resetNearestMarker: () => dispatch(resetNearestMarker()),
        setGeoUserAddress: (address,addressHeading) => dispatch(setGeoUserAddress(address,addressHeading)),
        setGeoCenterPoint: (centerPoint) => dispatch(setGeoCenterPoint(centerPoint)),
        getCustomerDeliveryAddress: (customer_id) => dispatch(getCustomerDeliveryAddress(customer_id)),
        //receivedCoupon: () => dispatch(receivedCoupon()),
        resetAlertBox: () => dispatch(resetAlertBox())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
