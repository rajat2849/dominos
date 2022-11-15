import { connect } from "react-redux";
import StoreLocator from "../components/StoreLocator";
import { } from "../modules/storeLocator";
import { findStore, validateUserCurrentAddress, getStoreLocation, resetStoreLocations, setUserNearestStore, resetAlertBox, resetNearestMarker } from "../../../store/findStore";
import { loadingImage } from "../../../store/app";

const mapStateToProps = (state) => {
    return ({
        lang: state.i18nState.lang,
        app: state.app.app,
        loader: state.app.loader,
        fetching: state.findStore.fetching,
        nearesrStores: state.findStore.nearesrStores,
        centerPoint: state.findStore.centerPoint,
        markers: state.findStore.markers,
        storeLocations: state.findStore.storeLocations,
        storeDetail: state.findStore.storeDetail,
        userCurrentAreaId: state.findStore.userCurrentAreaId,
        loaderFlag: state.findStore.loaderFlag,
        showAlert: state.findStore.showAlert,
        alertMessage: state.findStore.alertMessage,
        nearestMarker: state.findStore.nearestMarker,
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        loadingImage: (status) => dispatch(loadingImage(status)),
        getNearestStores: (lat, lng, areaId) => dispatch(findStore(lat, lng, areaId, "storelocator")),
        getStoreLocation: () => dispatch(getStoreLocation()),
        resetStoreLocations: () => dispatch(resetStoreLocations()),
        //setUserNearestStore: (lat, lng) => dispatch(setUserNearestStore(lat, lng)),
        resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
        resetNearestMarker: () => dispatch(resetNearestMarker()),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreLocator);
