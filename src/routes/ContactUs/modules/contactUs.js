import axios from 'axios';

import {Config} from '../../../config/Config';
// ------------------------------------
// Constants
// ------------------------------------
export const SENDING_FEEDBACK = 'SENDING_FEEDBACK';
export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const ERROR_FEEDBACK = 'ERROR_FEEDBACK';
export const FETTCHING_STORE_LIST = 'FETTCHING_STORE_LIST';
export const RECEIVED_STORE_LIST = 'RECEIVED_STORE_LIST';
export const STORE_LIST_ERROR = 'STORE_LIST_ERROR';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";

// ------------------------------------
// Actions
// ------------------------------------
export function sendingFeedback(status) {
	return {
		type: SENDING_FEEDBACK,
		sending: status
	}
}

export function receivedFeedback(response) {
	return {
		type: SEND_FEEDBACK,
		feedbackDetail: response
	}
}

export function errorFeedback(status) {
	return {
		type: ERROR_FEEDBACK,
		error: status
	}
}

export function fetchingStoreList(status) {
	return {
		type: FETTCHING_STORE_LIST,
		fetching: status
	}
}

export function receivedStoreList(storeList) {
	return {
		type: RECEIVED_STORE_LIST,
		storeList: storeList
	}
}

export function storeListError(status) {
	return {
		type: STORE_LIST_ERROR,
		error: status
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
// Actions creators
// ------------------------------------
export const sendFeedback = (values) => {
	return (dispatch) => {
		dispatch(sendingFeedback(true));
		let url = `${Config.url}contact`;
		let contactData = new FormData();
		contactData.append('sender_name', values.Name);
		contactData.append('sender_email', values.Email);
		contactData.append('sender_phone', values.Number);
		contactData.append('sender_address', values.Address);
		contactData.append('store_name', values.Store);
		contactData.append('subject', values.Subject);
		contactData.append('message', values.Message);
    axios({
		  method: 'post',
		  url: url,
		  timeout: 100000,
		  data: contactData,
		  headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
		}).then(response => {
			/*
			* set response in feedbackDetail props declared above
			*/
			dispatch(setAlertMeassage(true, response.data.message));
			dispatch(receivedFeedback(response));
			dispatch(sendingFeedback(false));
		}).catch(error => {
			dispatch(setAlertMeassage(true, error.response.data.message));
			dispatch(errorFeedback(true));
			dispatch(sendingFeedback(false));
		});
	}
}

export const fetchStoreList = () => {
	return (dispatch) => {
		dispatch(fetchingStoreList(true));
		let url = `${Config.url}getStore`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let storeList = [];
      if(response.data.data.length > 0) {
        storeList = response.data.data;
      }
      dispatch(receivedStoreList(storeList));
      dispatch(fetchingStoreList(false));
    }).catch( error => {
      dispatch(storeListError(true));
      dispatch(fetchingStoreList(false))
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
	[SENDING_FEEDBACK]: (state, action) => {
    return {
      ...state,
      sending: action.sending
    };
  },
  [SEND_FEEDBACK]: (state, action) => {
    return {
      ...state,
      feedbackDetail: action.feedbackDetail
    };
  },
  [ERROR_FEEDBACK]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [FETTCHING_STORE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_STORE_LIST]: (state, action) => {
    return {
      ...state,
      storeList: action.storeList
    };
  },
  [STORE_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
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
	sending: false,
	error: false,
	feedbackDetail: '',
	fetching: false,
	storeList: [],
	showAlert: false,
	alertMessage: "",
};

export default function storeLocatorReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
