import axios from "axios";
import { browserHistory } from "react-router";
import { Config, PaymentOption, Url, Tax } from "../../../config/Config";
import {
  getLocalStorage,
  removeLocalStorage,
  trackAddsWithFacebookPixel
} from "components/Helpers";
import { translate } from "components/Helpers";
export const FETCH_USER = "FETCH_USER";

// ------------------------------------
// Constants
// ------------------------------------
export const ONLINE_ORDER_RESPOSE = "ONLINE_ORDER_RESPOSE";
export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_RESPONSE = "PLACE_ORDER_RESPONSE";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const SET_PAYMENT_ONLINE = "SET_PAYMENT_ONLINE";
export const SET_FAILED_PAYMENT_STATE = "SET_FAILED_PAYMENT_STATE";

// ------------------------------------
// Actions
// ------------------------------------
export function fetchUserJourney(status, data) {
  return {
    type: FETCH_USER,
    user: data || {},
    fetching: status
  };
}

export function onlineOrderResponseData(data) {
  return {
    type: ONLINE_ORDER_RESPOSE,
    onlineOrderResponseData: data
  };
}

export function placeOrderRequest() {
  return {
    type: PLACE_ORDER_REQUEST,
    placingOrder: true
  };
}

export function placeOrderResponse() {
  return {
    type: PLACE_ORDER_RESPONSE,
    placingOrder: false
  };
}

export function setAlertMessage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

export function setPaymentOnlineData(data) {
  return {
    type: SET_PAYMENT_ONLINE,
    paymentOnlineData: data
  };
}

export function setFailedPaymentState(status) {
  return {
    type: SET_FAILED_PAYMENT_STATE,
    isPgPaymentFailed: status
  };
}

//--------------------------------------------
// Action Creator
//--------------------------------------------

var count = 0;
export const onlineOrderResponse = () => {
  return (dispatch, getState) => {
    dispatch(placeOrderRequest());
    const user = getState().user.user;
    let url = `${Config.url}getOrderStatus`;
    let order_id = getLocalStorage("order_id");
    axios
      .get(url, {
        params: {
          order_id: order_id
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
        console.log("response", response);
        dispatch(onlineOrderResponseData(response));
        if (response.data.order_status === "success") {
          console.log("in here 1");
          removeLocalStorage(["cart", "payment", "price", "productId"]);
          browserHistory.push(Url.THANK_YOU);
        } else if (response.data.order_status === "canceled") {
          dispatch(setFailedPaymentState(true));
          dispatch(placeOrderResponse());
          dispatch(
            setAlertMessage(
              true,
              translate(
                response.data.message !== null
                  ? response.data.message
                  : "order canceled"
              )
            )
          );
        } else if (response.data.order_status === "pending") {
          if (count <= 15) {
            setTimeout(function() {
              dispatch(onlineOrderResponse(order_id));
              count = count + 1;
            }, 6000);
            dispatch(placeOrderRequest());
          } else {
            dispatch(setFailedPaymentState(true));
            dispatch(placeOrderResponse());
            dispatch(
              setAlertMessage(
                true,
                translate(
                  "we could not place your order, your money will be refunded shortly."
                )
              )
            );
          }
        }
      })
      .catch(error => {
        console.log("in here", error);
        dispatch(placeOrderResponse());
        if (
          typeof error.response !== "undefined" &&
          typeof error.response.data !== "undefined" &&
          typeof error.response.data.message !== "undefined"
        ) {
          dispatch(setAlertMessage(true, error.response.data.message));
        } else {
          dispatch(
            setAlertMessage(
              true,
              translate(
                "Sorry, we are currently experiencing technical difficulty. Please try again later or call 1 500 366 to place an order."
              )
            )
          );
        }
      });
  };
};

export const resetAlertBox = (showAlert, message) => {
  return dispatch => {
    dispatch(setAlertMessage(showAlert, message));
  };
};

export const fetchUser = () => {
  return dispatch => {
    dispatch(fetchUserJourney(true));
    let profile = getLocalStorage("user");
    profile.fullAddress = "";
    if (typeof profile.address !== "undefined") {
      let fullAddress = [];
      Object.keys(profile.address).map(key => {
        if (typeof profile.address[key] !== "undefined") {
          fullAddress.push(profile.address[key]);
        }
      });
      profile.fullAddress =
        fullAddress.length > 0 ? fullAddress.join(", ") : "";
    }
    profile.fullName = profile.firstname;
    if (typeof profile.lastname !== "undefined") {
      profile.fullName +=
        typeof profile.lastname !== "undefined" ? " " + profile.lastname : "";
    }
    let cart = getLocalStorage("cart");
    let price = { subTotal: 0, tax: 0, total: 0, deliveryFee: 0 };
    // sort cart item based on modificationTime
    cart = cart.sort(
      (a, b) =>
        b[Object.keys(b)[0]].modificationTime -
        a[Object.keys(a)[0]].modificationTime
    );
    if (cart.length > 0) {
      cart.map(cartItem => {
        let item = Object.values(cartItem)[0];
        price.subTotal += parseInt(item.price);
      });
      price.tax = Math.round((price.subTotal * Tax.rate) / 100);
      price.total = price.subTotal + price.tax;
    }
    const deliveryType = getLocalStorage("order").deliveryType;
    let order = getLocalStorage("order");
    var d = new Date();
    var month = parseInt(d.getMonth()) + 1;
    month = month < 10 ? 0 + month.toString() : month;
    var date =
      d.getFullYear() +
      "-" +
      month +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      "-" +
      d.getMinutes() +
      "-" +
      d.getSeconds();
    if (order === null) {
      order = { orderDate: date };
    } else if (
      typeof order.orderDate === "undefined" ||
      order.orderDate === ""
    ) {
      order["orderDate"] = date;
    } else {
      order["orderDate"] = order["orderDate"] + " " + order["orderTime"];
    }
    const store = getLocalStorage("store");
    const payment = getLocalStorage("payment");
    let data = {
      profile: profile,
      cart: cart,
      price: price,
      deliveryType: deliveryType,
      order: order,
      payment: payment,
      store: store
    };
    dispatch(fetchUserJourney(false, data));
  };
};

export const actions = {
  onlineOrderResponse,
  fetchUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [PLACE_ORDER_REQUEST]: (state, action) => {
    return {
      ...state,
      placingOrder: action.placingOrder
    };
  },
  [PLACE_ORDER_RESPONSE]: (state, action) => {
    return {
      ...state,
      placingOrder: action.placingOrder
    };
  },
  [ONLINE_ORDER_RESPOSE]: (state, action) => {
    return {
      ...state,
      onlineOrderResponseData: action.onlineOrderResponseData
    };
  },
  [SET_FAILED_PAYMENT_STATE]: (state, action) => {
    return {
      ...state,
      isPgPaymentFailed: action.isPgPaymentFailed
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  },
  [FETCH_USER]: (state, action) => {
    return {
      ...state,
      user: action.user,
      fetching: action.fetching
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  onlineOrderResponseData: [],
  onlineOrderResponse: "",
  placingOrder: false,
  showAlert: false,
  alertMessage: "",
  isPgPaymentFailed: false,
  user: {},
  fetching: false
};

export default function errorReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// export const SET_DASHBOARD_PROPS = 'SET_DASHBOARD_PROPS';

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Actions creators
// ------------------------------------
