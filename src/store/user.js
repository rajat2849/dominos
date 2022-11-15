import {
  getLocalStorage,
  trackAddsWithFacebookPixel
} from "../components/Helpers";
import { Tax } from "../config/Config";
export const FETCH_USER = "FETCH_USER";
// export const SET_DASHBOARD_PROPS = 'SET_DASHBOARD_PROPS';

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

// ------------------------------------
// Actions creators
// ------------------------------------
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
      //profile.fullAddress = profile.address
    }
    profile.fullName = profile.firstname;
    if (typeof profile.lastname !== "undefined") {
      profile.fullName +=
        typeof profile.lastname !== "undefined" ? " " + profile.lastname : "";
    }
    //let cart = getLocalStorage('cart');
    const cart = JSON.parse(localStorage.getItem("cartItems"));
    let price = { subTotal: 0, tax: 0, total: 0, deliveryFee: 0 };
    // sort cart item based on modificationTime
    //cart = cart.sort((a, b) => b[Object.keys(b)[0]].modificationTime - a[Object.keys(a)[0]].modificationTime);
    if (cart.length > 0) {
      cart.map(cartItem => {
        //let item = Object.values(cartItem)[0];
        //price.subTotal += parseInt(item.price*item.qty);
        price.subTotal += parseInt(cartItem.price * cartItem.quantity);
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
  fetchUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  user: {},
  fetching: false
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
