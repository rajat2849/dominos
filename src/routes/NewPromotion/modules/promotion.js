import axios from "axios";
// import { browserHistory } from 'react-router';
import dateArray from "moment-array-dates";
import moment from "moment";

import { Config, Url } from "config/Config";
import {
  getLocalStorage,
  saveLocalStorage,
  translate
} from "components/Helpers";
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CONFIG = "GET_CONFIG";
export const SET_CONFIG = "SET_CONFIG";
export const APPLYING_VOUCHER_CODE = "APPLYING_VOUCHER_CODE";

// ------------------------------------
// Actions
// ------------------------------------

export function getConfig(data) {
  return {
    type: GET_CONFIG,
    config: data
  };
}
export function setConfig(data) {
  return {
    type: SET_CONFIG,
    configuration: data
  };
}
export function applyingVoucherCode(status) {
  return {
    type: APPLYING_VOUCHER_CODE,
    applying: status
  };
}

export const fetchConfig = () => {
  return dispatch => {
  	dispatch(applyingVoucherCode(true));
    let url = `${Config.url}getConfiguration`;
    axios
      .get(url, {
        headers: {
          token: Config.token,
          "device-type": Config.devicetype,
          Accept: Config.Accept,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        
      	if(!_.isEmpty(response.data.data) && _.has(response.data.data,"coupons")){
              saveLocalStorage("configurationData",response.data.data)
      		saveLocalStorage("restrictedCoupon",response.data.data.coupons.data)
      		 dispatch(getConfig(response.data.data.coupons.data));
           dispatch(setConfig(response.data.data));
            dispatch(applyingVoucherCode(false));
      	}
      })
      .catch(error => {
      	  dispatch(applyingVoucherCode(false));
    
      });
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
[GET_CONFIG]: (state, action) => {
    return {
      ...state,
      config: action.config
    };
  },
  [SET_CONFIG]: (state, action) => {
    return {
      ...state,
      configuration: action.configuration
    };
  },
    [APPLYING_VOUCHER_CODE]: (state, action) => {
    return {
      ...state,
      applyVoucherCode: action.applying
    };
  },
  
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	config:[],
  configuration:{},
	applyVoucherCode:false
};

export default function storeLocatorReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}