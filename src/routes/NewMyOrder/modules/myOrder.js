import axios from 'axios';
import { browserHistory } from 'react-router';
import { getLocalStorage, /*prepareAddToOrderData*/ } from '../../../components/Helpers';
import {Config} from '../../../config/Config';
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_FAVORITE_ORDER = 'FETCHING_FAVORITE_ORDER';
export const RECEIVED_FAVORITE_ORDER = 'RECEIVED_FAVORITE_ORDER';
export const ERROR_FAVORITE_ORDER = 'ERROR_FAVORITE_ORDER';
export const FETCHING_PREVIOUS_ORDER = 'FETCHING_PREVIOUS_ORDER';
export const RECEIVED_PREVIOUS_ORDER = 'RECEIVED_PREVIOUS_ORDER';
export const ERROR_PREVIOUS_ORDER = 'ERROR_PREVIOUS_ORDER';
export const SET_ORDERING_STATUS = 'SET_ORDERING_STATUS';
export const RECEIVED_ORDER_RESPONSE = 'RECEIVED_ORDER_RESPONSE';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
// ------------------------------------
// Actions
// ------------------------------------

export function fetchingFavoriteOrder(status) {
	return {
		type: FETCHING_FAVORITE_ORDER,
		fetching: status,
	}
}

export function receivedFavoriteOrder(favoriteOrder) {
	return {
		type: RECEIVED_FAVORITE_ORDER,
		favoriteOrder: favoriteOrder,
    showFavOrder : true
	}
}

export function errorFavoriteOrder(status) {
	return {
		type: ERROR_FAVORITE_ORDER,
		error: status
	}
}

export function fetchingPreviousOrder(status) {
	return {
		type: FETCHING_PREVIOUS_ORDER,
		fetching: status
	}
}

export function receivedPreviousOrder(previousOrder) {
	return {
		type: RECEIVED_PREVIOUS_ORDER,
		previousOrder: previousOrder
	}
}

export function errorPreviousOrder(status) {
  return {
    type: ERROR_PREVIOUS_ORDER,
    error: status
  }
}

export function setOrderingStatus(fetching, error) {
  return {
    type: SET_ORDERING_STATUS,
    fetching: fetching,
    error: error
  }
}

export function receivedOrderResponse(response) {
	return {
		type: RECEIVED_ORDER_RESPONSE,
		orderResponse: response,
	}
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

export const fetchFavoriteOrder = () => {
  return (dispatch) => {
		dispatch(fetchingFavoriteOrder(true));
		let user = getLocalStorage('receivedLoginDetail');
		let url = `${Config.url}getFavoriteOrder`;
    axios.get(url, {
    	params: {
        customer_id: user.customer_id
      },
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let favoriteOrder = [];
      if(typeof response.data.data !== 'undefined' && response.data.data.length > 0) {
        favoriteOrder = response.data.data;
      }
      dispatch(receivedFavoriteOrder(favoriteOrder));
      dispatch(fetchingFavoriteOrder(false));
			dispatch(showFavroiteAlert(false));
    }).catch( error => {
        dispatch(errorFavoriteOrder(true));
        dispatch(fetchingFavoriteOrder(false));
    });
	}
}

export const fetchPreviousOrder = () => {
  return (dispatch) => {
    dispatch(fetchingPreviousOrder(true));
    let user = getLocalStorage('receivedLoginDetail');
    let url = `${Config.url}getPreviousOrder`;
    axios.get(url, {
      params: {
        customer_id: user.customer_id
      },
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let previousOrder = [];
      if(typeof response.data.data !== 'undefined' && response.data.data.length > 0) {
        previousOrder = response.data.data;
      }
      dispatch(receivedPreviousOrder(previousOrder));
      dispatch(fetchingPreviousOrder(false));
			dispatch(showPreviousAlert(false));
    }).catch( error => {
        dispatch(errorPreviousOrder(true));
        dispatch(fetchingPreviousOrder(false));
    });
  }
}

export const placeMyOrder = (customerId, orderId) => {
	return (dispatch) => {
		dispatch(setOrderingStatus(true, false));
		let url = `${Config.url}reorder`;
    let placeOrder = new FormData();
    placeOrder.append('customer_id', customerId);
    placeOrder.append('order_id', orderId);
    axios({
      method: 'post',
      url: url,
      timeout: 100000,
      data: placeOrder,
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      //let orderData = prepareAddToOrderData(response.data.data);
      if(typeof response.data !== 'undefined') {
				if(response.data.message!==undefined){
          dispatch(setAlertMeassage(true, "Reorder is Successful"));
        }else{
          dispatch(setAlertMeassage(true, response,data.message));
        }
        dispatch(receivedOrderResponse(response));
        dispatch(setOrderingStatus(false, false));
      }
    }).catch(error => {
      console.log(error.response);
			dispatch(setAlertMeassage(true, "Reorder Failed!"));
      dispatch(setOrderingStatus(false, true));
    });
	}
}

export const resetAlertBox = (showAlert, message) => {
  return (dispatch) => {
    dispatch(setAlertMeassage(showAlert, message));
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[FETCHING_FAVORITE_ORDER]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
    };
  },
	[RECEIVED_FAVORITE_ORDER]: (state, action) => {
    return {
      ...state,
      favoriteOrder: action.favoriteOrder,
      showFavOrder: action.showFavOrder
    };
  },
  [ERROR_FAVORITE_ORDER]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },
  [FETCHING_PREVIOUS_ORDER]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
	[RECEIVED_PREVIOUS_ORDER]: (state, action) => {
    return {
      ...state,
      previousOrder: action.previousOrder,
    };
  },
  [ERROR_PREVIOUS_ORDER]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },
  [SET_ORDERING_STATUS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      error: action.error,
    };
  },
  [RECEIVED_ORDER_RESPONSE]: (state, action) => {
    return {
      ...state,
      orderResponse: action.orderResponse,
    };
  },
	[SET_ALERT_MESSAGE]: (state, action) => {
	    return {
	        ...state,
	        showAlert: action.showAlert,
	        alertMessage: action.alertMessage
	    };
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  error: false,
  favoriteOrder: [],
  previousOrder: [],
  favoriteAlert: '',
  previousAlert: '',
  orderResponse: [],
	showAlert: false,
	alertMessage: "",
  showFavOrder: false 
};

export default function MyOrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
