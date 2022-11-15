import axios from 'axios';

import {Config } from 'config/Config';
import { saveLocalStorage } from 'components/Helpers';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_PRODUCT_LIST = 'FETCHING_PRODUCT_LIST';
export const RECEIVED_PRODUCT_DETAIL = 'RECEIVED_PRODUCT_DETAIL';
export const PRODUCT_LIST_ERROR = 'PRODUCT_LIST_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingProductList(status) {
  return {
    type: FETCHING_PRODUCT_LIST,
    fetching: status,
  };
}

export function receivedProductDetail(data) {
  return {
    type: RECEIVED_PRODUCT_DETAIL,
    referalProductDetail: data,
  };
}

export function productListError (status) {
  return {
    type: PRODUCT_LIST_ERROR,
    error: status
  };
}
// ------------------------------------
// Actions creators
// ------------------------------------
export const getPromotionList = () => {
  return async(dispatch) => {
    dispatch(fetchingProductList(true));
    let url = `${Config.url}getlistpromotions`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let promotionList = [];
      if(response.data.data.length > 0) {
        promotionList = response.data.data;
        saveLocalStorage('promotionList', promotionList);
        dispatch(receivedProductDetail(promotionList));
        dispatch(fetchingProductList(false));
      }
    }).catch( error => {
      dispatch(productListError(true));
    });
  };
};

export const getValueDealsList = () => {
  return async (dispatch) => {
    dispatch(fetchingProductList());
    let url = `${Config.url}getlistvaluedeals`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let valueDealsList = [];
      if(response.data.data.length > 0) {
        valueDealsList = response.data.data;
        saveLocalStorage('valueDealsList', valueDealsList);
        dispatch(receivedProductDetail(valueDealsList));
        dispatch(fetchingProductList(false));
      }
    }).catch( error => {
      dispatch(productListError(true));
    });
  };
};

export const getPizzaList = () => {
  return async (dispatch) => {
    dispatch(fetchingProductList());
    let url = `${Config.url}getlistpizza`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let pizzaList = [];
      if(response.data.data.length > 0) {
        pizzaList = response.data.data;
        saveLocalStorage('pizzaList', pizzaList);
        dispatch(receivedProductDetail(pizzaList));
        dispatch(fetchingProductList(false));
      }
    }).catch( error => {
      dispatch(productListError(true));
    });
  };
};

export const getSidesDessertsList = () => {
  return async (dispatch) => {
    dispatch(fetchingProductList());
    let url = `${Config.url}getlistsideanddesserts`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let sidesDessertList = [];
      let sortedSides = [];
      if(response.data.data.length > 0) {
        sidesDessertList = response.data.data;
        saveLocalStorage('sidesDessert', sidesDessertList);
        dispatch(receivedProductDetail(sidesDessertList));
        dispatch(fetchingProductList(false));
      }
    }).catch( error => {
      dispatch(productListError(true));
    });
  };
};

export const getBeverageList = () => {
  return async (dispatch) => {
    dispatch(fetchingProductList());
    let url = `${Config.url}getlistbeverages`;
    axios.get(url, {
      params: {
        grouping: true
      },
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let beverageList = [];
      if(response.data.data.length > 0) {
        beverageList = response.data.data;
        saveLocalStorage('beverage', beverageList);
        dispatch(receivedProductDetail(beverageList));
        dispatch(fetchingProductList(false));
      }
    }).catch( error => {
      dispatch(productListError(true));
    });
  };
};

export const actions = {
  getPromotionList,
  getValueDealsList,
  getPizzaList,
  getSidesDessertsList,
  getBeverageList
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCHING_PRODUCT_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_PRODUCT_DETAIL]: (state, action) => {
    return {
      ...state,
      referalProductDetail: action.referalProductDetail
    };
  },
  [PRODUCT_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  referalProductDetail: [],
  error: false,
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
