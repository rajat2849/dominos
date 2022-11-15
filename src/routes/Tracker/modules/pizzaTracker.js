import axios from "axios";
import Config from "../../../config/Config";
import { getSessionStorage } from "components/Helpers";

// ------------------------------------
// Constants
// ------------------------------------
export const SET_SEARCH_ORDER_ID = "SET_SEARCH_ORDER_ID";
export const SET_TRACK_ORDER_FETCHING = "SET_TRACK_ORDER_FETCHING";
export const SET_TRACK_ORDER_ERROR = "SET_TRACK_ORDER_ERROR";
export const SET_TRACK_ORDER_RECEIVED = "SET_TRACK_ORDER_RECEIVED";
export const RESET_TRACK_ORDER_DATA = "RESET_TRACK_ORDER_DATA";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";

// ------------------------------------
// Actions
// ------------------------------------

export function setSearchOrderId(values) {
  return {
    type: SET_SEARCH_ORDER_ID,
    orderId: values
  };
}

export function setTrackOrderError(status) {
  return {
    type: SET_TRACK_ORDER_ERROR,
    error: status
  };
}

export function setTrackOrderFetching(status) {
  return {
    type: SET_TRACK_ORDER_FETCHING,
    fetching: status
  };
}

export function setTrackOrderReceived(values) {
  return {
    type: SET_TRACK_ORDER_RECEIVED,
    orderData: values
  };
}

export function resetTrackOrderData() {
  return {
    type: RESET_TRACK_ORDER_DATA,
    orderData: []
  };
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

// ------------------------------------
// Action creators
// ------------------------------------
export const setOrderId = values => {
  return dispatch => {
    dispatch(setSearchOrderId(values));
  };
};

export const setOrderTrackerDetails = () => {
  return async dispatch => {
    dispatch(setTrackOrderFetching(true));
    dispatch(setAlertMeassage(false,""));
    const trackerInput = getSessionStorage("trackerInput");
    if (trackerInput !== "") {
      var url = `${Config.url}ordertracker`;
      await axios
        .get(url, {
          params: {
            keyword: trackerInput
          },
          headers: {
            token: Config.token,
            "device-type": Config.devicetype,
            Accept: Config.Accept,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          let pizzaTrack = {};
          if (response.data.data.length > 0 && response.data.data[0] !== null) {
            const orders = response.data.data;
            pizzaTrack = orders[orders.length - 1];
            pizzaTrack.lat_store = parseFloat(pizzaTrack.lat_store);
            pizzaTrack.long_store = parseFloat(pizzaTrack.long_store);
            pizzaTrack.lat_destination = parseFloat(pizzaTrack.lat_destination);
            pizzaTrack.long_destination = parseFloat(
              pizzaTrack.long_destination
            );
            pizzaTrack.lat_driver = parseFloat(pizzaTrack.lat_driver);
            pizzaTrack.long_driver = parseFloat(pizzaTrack.long_driver);
            dispatch(setTrackOrderFetching(false));
            dispatch(setTrackOrderReceived(pizzaTrack));
            //dispatch(setAlertMeassage(true, translate("Order found")));
          }
        })
        .catch(error => {
          dispatch(setAlertMeassage(true,"Order not found"));
          dispatch(setTrackOrderFetching(false));
          dispatch(setTrackOrderError(error));
          dispatch(resetTrackOrderData());
        });
    } else {
      dispatch(setTrackOrderFetching(false));
    }
  };
};

export const resetAlertBox = (showAlert, message) => {
  return dispatch => {
    dispatch(setAlertMeassage(showAlert, message));
  };
};

export const resetTrackerContent = () => {
  return dispatch => {
    dispatch(resetTrackOrderData());
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SEARCH_ORDER_ID]: (state, action) => {
    return {
      ...state,
      orderId: action.orderId
    };
  },
  [SET_TRACK_ORDER_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [SET_TRACK_ORDER_FETCHING]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [SET_TRACK_ORDER_RECEIVED]: (state, action) => {
    return {
      ...state,
      orderData: action.orderData
    };
  },
  [RESET_TRACK_ORDER_DATA]: (state, action) => {
    return {
      ...state,
      orderData: action.orderData
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderId: "",
  fetching: false,
  error: false,
  orderData: [],
  showAlert: false,
  alertMessage: ""
};

export default function storeLocatorReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
