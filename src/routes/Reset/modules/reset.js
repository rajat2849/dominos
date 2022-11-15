import axios from 'axios';
import { browserHistory } from 'react-router';
import { Config, Url } from '../../../config/Config';
import { getLocalStorage } from 'components/Helpers';


// ------------------------------------
// Constants
// ------------------------------------
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const UPDATING_PASSWORD = "UPDATING_PASSWORD";
export const PASSWORD_UPDATE_ERROR = "PASSWORD_UPDATE_ERROR";


// ------------------------------------
// Actions
// ------------------------------------

export function updatingPassword (status) {
	return {
		type: UPDATING_PASSWORD,
		updating: status
	}
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

export function fetchingError(status) {
	return {
		type: PASSWORD_UPDATE_ERROR,
		error: status
	}
}

// ------------------------------------
// Action creators
// ------------------------------------
export const resetPassword = (value) => {
	return (dispatch) => {
		dispatch(updatingPassword(true));
	  let url = `${Config.url}resetPassword`;
	  let resetData = getLocalStorage('resetPassword');
	  let updatedPassword = new FormData();
	  updatedPassword.append('new_password',value.Password);
	  updatedPassword.append('new_password_confirmation',value.ConfirmPassword);
	  updatedPassword.append('id',resetData.id);
	  updatedPassword.append('token',resetData.token);
		axios({
      method: 'post',
      url: url,
      data: updatedPassword,
      headers: {'token': Config.token,
      	'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
    	}
    }).then( response => {
    		if (typeof response.data !== 'undefined') {
				dispatch(setAlertMeassage(true, response.data.message));
				dispatch(updatingPassword(false, response.data));
			}
    }).catch(err => {
    		dispatch(setAlertMeassage(true, error.response.data.message));
				dispatch(fetchingError(true));
    })
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
	[SET_ALERT_MESSAGE]: (state, action) => {
	  return {
	    ...state,
	    showAlert: action.showAlert,
	    alertMessage: action.alertMessage
	  };
	},
	[PASSWORD_UPDATE_ERROR]: (state, action) => {
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
	showAlert: false,
	alertMessage: "",
};

export default function resetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}