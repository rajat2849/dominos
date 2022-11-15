import { saveLocalStorage, getLocalStorage, removeLocalStorage, getAllArchive, preparePlaceOrderCart, trackAddsWithFacebookPixel } from 'components/Helpers';


// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ORDER_SUMMARY_REQUEST = 'FETCH_ORDER_SUMMARY_REQUEST';
export const FETCH_ORDER_SUMMARY_RESPONSE = 'FETCH_ORDER_SUMMARY_REQUEST';
export const RESET_ORDER_SUMMARY_PROPS = 'RESET_ORDER_SUMMARY_PROPS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchOrderRequest () {
  return {
    type: FETCH_ORDER_SUMMARY_REQUEST,
    orderSummaryFetching: false
  };
}

export function fetchOrderResponse(data) {
  return {
    type: FETCH_ORDER_SUMMARY_RESPONSE,
    orderSummaryFetching: false,
    orderSummary: data
  };
}

export function resetOrderSummaryProps() {
  return {
    type: RESET_ORDER_SUMMARY_PROPS,
    orderSummary: {}
  };
}

// ------------------------------------
// Action creators
// ------------------------------------

export const fetchOrderSummary = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrderRequest());
    var user = getState().user.user;
    let paymentMode = getLocalStorage('paymentMode');
    if (paymentMode.option === 'snapmigs') {
      var user = {};
      let a = getLocalStorage ('order_id');
      user.order={};
      user.order.orderId = getLocalStorage('order_id');
      let b = getLocalStorage('order');
      user.deliveryType = b.deliveryType;
      let store = getLocalStorage('store');
      user.store={};
      user.store.AddressLine1 = store.AddressLine1;
      let c = getLocalStorage('user');
      user.profile = {};
      user.profile.phoneNumber = c.phoneNumber; 
  }
    const data = {
      orderId: (typeof user.order !== 'undefined' && typeof user.order.orderId !== 'undefined' ) ? user.order.orderId : '',
      deliveryType: (typeof user.deliveryType !== 'undefined') ? user.deliveryType : '',
      storeAddress: (typeof user.store !== 'undefined' && typeof user.store.AddressLine1 !== 'undefined' ) ? user.store.AddressLine1 : '',
      userAddress: (typeof user.profile !== 'undefined' && typeof user.profile.fullAddress !== 'undefined' ) ? user.profile.fullAddress : '',
      phoneNumber: (typeof user.profile !== 'undefined' && typeof user.profile.phoneNumber !== 'undefined') ? user.profile.phoneNumber : ''
    };
    dispatch(fetchOrderResponse(data));
  };
};

export const resetOrderSummary = () => {
  return (dispatch) => {
    dispatch(resetOrderSummaryProps());
  }
}

export const actions = {
  fetchOrderSummary,
  resetOrderSummary
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ORDER_SUMMARY_REQUEST]: (state, action) => {
    return {
      ...state,
      orderSummaryFetching: action.orderSummaryFetching
    };
  },
  [FETCH_ORDER_SUMMARY_RESPONSE]: (state, action) => {
    return {
      ...state,
      orderSummaryFetching: action.orderSummaryFetching,
      orderSummary: action.orderSummary
    };
  },
  [RESET_ORDER_SUMMARY_PROPS]: (state, action) => {
    return {
      ...state,
      orderSummary: action.orderSummary
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderSummary: {},
  orderSummaryFetching: false
};


export default function thankyouReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
