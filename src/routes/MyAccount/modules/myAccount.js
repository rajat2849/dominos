import axios from 'axios';
import { browserHistory } from 'react-router';

import {Config} from 'config/Config';
import { saveLocalStorage, getLocalStorage } from 'components/Helpers';
// ------------------------------------
// Constants
// ------------------------------------
export const CONTACT_TYPE = 'CONTACT_TYPE';
export const UPDATING_LOGIN_INFO = 'UPDATING_LOGIN_INFO';
export const UPDATED_LOGIN_INFO = 'UPDATED_LOGIN_INFO';
export const ERROR_LOGIN_INFO = 'ERROR_LOGIN_INFO';
export const CUSTOMER_UPDATING = 'CUSTOMER_UPDATING';
export const CUSTOMER_UPDATED = 'CUSTOMER_UPDATED';
export const CUSTOMER_ERROR = 'CUSTOMER_ERROR';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";

// ------------------------------------
// Actions
// ------------------------------------

export function contactType (type) {
	return {
		type: CONTACT_TYPE,
		contactType: type
	}
}

export function updatingLoginInfo (status) {
	return {
		type: UPDATING_LOGIN_INFO,
		updating: status
	}
}

export function updatedLoginInfo (status, payload) {
	return {
		type: UPDATED_LOGIN_INFO,
		updating: status,
		updatedLoginInfo: payload
	}
}

export function errorLoginInfo (status) {
	return {
		type: ERROR_LOGIN_INFO,
		error: status
	}
}

export function customerUpdating (status) {
	return {
		type: CUSTOMER_UPDATING,
		updating: status
	}
}

export function customerUpdated (payload) {
	return {
		type: CUSTOMER_UPDATED,
		updatedCustomer: payload
	}
}

export function customerError (status) {
	return {
		type: CUSTOMER_ERROR,
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

//-------------------------------------
// Action creator
//-------------------------------------

export const setContactType = (type) => {
	return (dispatch) => {
		dispatch(contactType(type));
	}
}

export const updateLoginInfo = (values) => {
	return (dispatch) => {
		dispatch(updatingLoginInfo(true));
		let url = `${Config.url}updatepassword`;
		let updateLoginData = new FormData();
		updateLoginData.append('customer_id', values.customer_id);
		updateLoginData.append('old_password', values.Oldpassword);
		updateLoginData.append('new_password', values.Password);
		updateLoginData.append('new_password_confirmation', values.Confirmpassword);
    axios({
		  method: 'post',
		  url: url,
		  timeout: 100000,
		  data: updateLoginData,
		  headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
		}).then(response => {
			let userData = {};
			if (typeof response.data !== 'undefined') {
				dispatch(setAlertMeassage(true, response.data.message));
				dispatch(updatedLoginInfo(false, response.data));
			}
		}).catch(error => {
			dispatch(setAlertMeassage(true, "Wrong Password"));
			dispatch(errorLoginInfo(true));
		});
	}
}

export const updateCustomer = (values) => {
	return (dispatch) => {
		dispatch(customerUpdating(true));
		let url = `${Config.url}updatecustomernew`;
		let updateCustomer = new FormData();
		if (values.MobileType === 'mobile') {
			updateCustomer.append('contact_number', values.phoneNumber);
			updateCustomer.append('contact_type', "m");
		}
		else if(values.MobileType === 'home') {
			updateCustomer.append('contact_number', values.extPhoneNumber);
			updateCustomer.append('contact_type', "h");
		}
		else if(values.MobileType === 'office') {
			updateCustomer.append('contact_number', values.extPhoneNumber);
			updateCustomer.append('contact_type', "o");
		}
   		updateCustomer.append('customer_id', values.customer_id);
		updateCustomer.append('prefix', '');
		updateCustomer.append('firstname', values.Firstname);
		updateCustomer.append('lastname', values.Lastname);
		updateCustomer.append('birthdate', values.Dob);
		updateCustomer.append('contact_ext', values.Ext);
		updateCustomer.append('current_password', values.password);
    axios({
		  method: 'post',
		  url: url,
		  timeout: 100000,
		  data: updateCustomer,
		  headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
		}).then(response => {
			let updateData = {};
			if (typeof response.data.data !== 'undefined') {
				if (response.data.data.contact_type ==='m') {
					updateData = {
						firstname: response.data.data.firstname,
						lastname: response.data.data.lastname,
						email: response.data.data.email,
						phoneNumber: response.data.data.contact_number,
						contact_ext: response.data.data.contact_ext,
						dob: response.data.data.dob,
						contact_type: 'mobile',
						password:response.data.data.password
					}	
				}else if (response.data.data.contact_type ==='h') {
					updateData = {
						firstname: response.data.data.firstname,
						lastname: response.data.data.lastname,
						email: response.data.data.email,
						phoneNumber: response.data.data.contact_number,
						contact_ext: response.data.data.contact_ext,
						dob: response.data.data.dob,
						contact_type: 'home',
						password:response.data.data.password
					}
				} else {
					updateData = {
						firstname: response.data.data.firstname,
						lastname: response.data.data.lastname,
						email: response.data.data.email,
						phoneNumber: response.data.data.contact_number,
						contact_ext: response.data.data.contact_ext,
						dob: response.data.data.dob,
						contact_type: 'office',
						password:response.data.data.password
					}
				}		
				saveLocalStorage('user', updateData);
				let loginData = getLocalStorage('receivedLoginDetail');
				loginData.dob = response.data.data.dob;
				saveLocalStorage('receivedLoginDetail',loginData);
				dispatch(customerUpdated(response.data));
				dispatch(customerUpdating(false));
				dispatch(setAlertMeassage(true, response.data.message));
			}
		}).catch(error => {
			dispatch(customerError(true));
			dispatch(setAlertMeassage(true,"Wrong Password"));
		});
	}
}

export const resetAlertBox = (showAlert, message) => {
  return (dispatch) => {
    dispatch(setAlertMeassage(showAlert, message));
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[CONTACT_TYPE]: (state, action) => {
    return {
      ...state,
      contactType: action.contactType
    };
  },
  [UPDATING_LOGIN_INFO]: (state, action) => {
    return {
      ...state,
      updating: action.updating
    };
  },
  [UPDATED_LOGIN_INFO]: (state, action) => {
    return {
      ...state,
      updating: action.updating,
      updatedLoginInfo: action.updatedLoginInfo
    };
  },
  [CUSTOMER_UPDATING]: (state, action) => {
    return {
      ...state,
      updating: action.updating,
    };
  },
  [CUSTOMER_UPDATED]: (state, action) => {
    return {
      ...state,
      updatedCustomer: action.updatedCustomer,
    };
  },
  [ERROR_LOGIN_INFO]: errorLoginInfo,
  [CUSTOMER_ERROR]: customerError,
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
	contactType: '',
	updating: false,
	error: false,
	updatedLoginInfo: {},
	updatedCustomer: {},
	showAlert: false,
	alertMessage: "",
};

export default function AccountReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
