import { connect } from 'react-redux';

import MyOrder from '../components/MyOrder';
import { fetchFavoriteOrder, fetchPreviousOrder, placeMyOrder, resetAlertBox } from '../modules/myOrder';
import { loadingImage } from "../../../store/app";

const mapStateToProps = (state) => {
  return({
    lang: state.i18nState.lang,
  	fetching: state.MyOrder.fetching,
  	error: state.MyOrder.error,
  	favoriteOrder: state.MyOrder.favoriteOrder,
  	favoriteAlert: state.MyOrder.favoriteAlert,
  	previousOrder: state.MyOrder.previousOrder,
  	previousAlert: state.MyOrder.previousAlert,
    showAlert: state.MyOrder.showAlert,
    alertMessage: state.MyOrder.alertMessage,
    loader: state.app.loader,
    orderResponse: state.MyOrder.orderResponse,
    showFavOrder:state.MyOrder.showFavOrder,
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    fetchFavoriteOrder: () => dispatch(fetchFavoriteOrder()),
    fetchPreviousOrder: () => dispatch(fetchPreviousOrder()),
    placeMyOrder: (customerId, orderId) => dispatch(placeMyOrder(customerId, orderId)),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    loadingImage: (status) => dispatch(loadingImage(status)),
  });
};


export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
