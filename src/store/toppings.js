import axios from 'axios';

import {Config, WeekDay} from '../config/Config';
import { saveLocalStorage } from 'components/Helpers';
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_TOPPING_DETAIL = 'FETCHING_TOPPING_DETAIL';
export const RECEIVED_TOPING_DETAIL = 'RECEIVED_TOPING_DETAIL';
export const ERROR_TOPPING_DETAIL = 'ERROR_TOPPING_DETAIL';
export const SET_DEFAULT_TOPPINGS = 'SET_DEFAULT_TOPPINGS';
export const RESET_ALL_PROPS = 'RESET_ALL_PROPS';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingTopingDetail(status) {
  return {
    type: FETCHING_TOPPING_DETAIL,
    fetching: status,
  };
}

export function receivedTopingDetail(topings) {
  return {
    type: RECEIVED_TOPING_DETAIL,
    allToppings: topings,
  };
}

export function errorToppingDetail(status) {
  return {
    type: ERROR_TOPPING_DETAIL,
    error: status
  };
}

export function settingDefaultToppings(defaultToppings) {
  return {
    type: SET_DEFAULT_TOPPINGS,
    defaultToppings: defaultToppings
  };
}

export function resetAllProps() {
  return {
    type: RESET_ALL_PROPS,
    defaultToppings: [],
    allToppings: [],
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
// Actions creator
// ------------------------------------
export const fetchAllTopings = (defaultToppings) => {
	return (dispatch) => {
		let defaultToppingsArray = [];
		let toppingsNameDetail = [];
		toppingsNameDetail = defaultToppings.split(',');
		dispatch(fetchingTopingDetail(true));
		let url = `${Config.url}getpizzatoppings`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let toppings = [];
      let count = 1;
      if(response.data.data.length > 0) {
        toppings = response.data.data;
      }
      let itemArray = [];
      let toppingDetail = {};
      toppingsNameDetail.map((toppingName) => {
      	toppings.map((item, index) => {
      		if(toppingName.toLowerCase() === item.opt_code.toLowerCase()) {
      			toppingDetail = {
      				image: item.image,
      				code: item.opt_code,
      				name: item.opt_name_en,
              count: 1,
              from: 'current'
      			};
      			defaultToppingsArray.push(toppingDetail);
      			itemArray.push(item.opt_code);
      		}
      	item.count = count;
      	})
      });
			dispatch(settingDefaultToppings(defaultToppingsArray));
      dispatch(receivedTopingDetail(toppings));
      dispatch(fetchingTopingDetail(false));
    }).catch( error => {
      dispatch(errorToppingDetail(true));
    });
	}
}

export const resetProps = () => {
	return (dispatch) => {
		dispatch(resetAllProps());
	}
}

export const actions = {
  fetchAllTopings,
};

export const resetAlertBox = (showAlert, message) => {
  return (dispatch) => {
    dispatch(setAlertMeassage(showAlert, message));
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[FETCHING_TOPPING_DETAIL]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_TOPING_DETAIL]: (state, action) => {
    return {
      ...state,
      allToppings: action.allToppings,
    };
  },
  [SET_DEFAULT_TOPPINGS]: (state, action) => {
    return {
      ...state,
      defaultToppings: action.defaultToppings,
    };
  },
  [RESET_ALL_PROPS]: (state, action) => {
    return {
      ...state,
      defaultToppings: action.defaultToppings,
      allToppings: action.allToppings,
    };
  },
  [ERROR_TOPPING_DETAIL]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
      return {
          ...state,
          showAlert: action.showAlert,
          alertMessage: action.alertMessage
      };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	fetching: false,
	error: false,
	allToppings: [],
	defaultToppings: [],
  showAlert: false,
  alertMessage: "",
};

export default function OrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
