import { connect } from "react-redux";
import PizzaTracker from "../components/PizzaTracker";
//import SearchBar from '../components/SearchBar';
import {
  setOrderId,
  setOrderTrackerDetails,
  resetAlertBox,
  resetTrackerContent
} from "../modules/pizzaTracker";
import { getLocalStorage } from "components/Helpers";
import { loadingImage } from "../../../store/app";

const SearchBarFormValues = state => {
  const order = getLocalStorage("orderConfirm");
  const orderId = getLocalStorage("order_id");
  let searchKeyword = "";
  // order id - get today's latest order
  if (
    typeof order !== "undefined" &&
    typeof orderId !== "undefined" &&
    typeof order.tracking_code !== "undefined"
  ) {
    let orderDate = order.tracking_code.split("#");
    orderDate = orderDate[0].split("-");
    const d = new Date();
    if (
      orderDate[0] == d.getFullYear() &&
      orderDate[1] - 1 == d.getMonth() &&
      orderDate[2] == d.getDate()
    ) {
      searchKeyword = orderId;
    }
  }
  return {
    search: searchKeyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrderId: values => dispatch(setOrderId(values)),
    setOrderTrackerDetails: () => dispatch(setOrderTrackerDetails()),
    resetAlertBox: (showAlert, message) =>
      dispatch(resetAlertBox(showAlert, message)),
    loadingImage: status => dispatch(loadingImage(status)),
    resetTrackerContent: () => dispatch(resetTrackerContent())
  };
};

const mapStateToProps = state => {
  return {
    loader: state.app.loader,
    lang: state.i18nState.lang,
    orderId: state.Tracker.orderId,
    initialValues: SearchBarFormValues(state),
    orderData: state.Tracker.orderData,
    showAlert: state.Tracker.showAlert,
    alertMessage: state.Tracker.alertMessage,
    fetching: state.Tracker.fetching
  };
};

// let SearchBarReduxForm = reduxForm({
//   form: 'SearchBar',
//   enableReinitialize: true,
// })(SearchBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaTracker);
