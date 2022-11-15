import axios from 'axios';
import { browserHistory } from 'react-router';

import querystring from 'querystring';

import {Config} from '../../../config/Config';
import {saveLocalStorage, getLocalStorage, removeLocalStorage} from '../../../components/Helpers';
//import { request } from 'lib/ApiController';
import { translate } from 'components/Helpers';
import { getCartItems } from '../../../store/cart';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_VERIFY_ACCOUNT = 'SET_VERIFY_ACCOUNT';
export const SET_USER_MAIL = 'SET_USER_MAIL';
export const RESET_REGISTER_FORM_VALUE = 'RESET_REGISTER_FORM_VALUE';
export const RESET_VERIFY_FORM_VALUE = 'RESET_VERIFY_FORM_VALUE';
export const ACCOUNT_VERIFYING = 'ACCOUNT_VERIFYING';
export const ACCOUNT_VERIFIED = 'ACCOUNT_VERIFIED';
export const ACCOUNT_VERIFY_ERROR = 'ACCOUNT_VERIFY_ERROR';
export const SENDING_ACTIVATION_CODE = 'SENDING_ACTIVATION_CODE';
export const SEND_ACTIVATION_CODE = 'SEND_ACTIVATION_CODE';
export const ERROR_ACTIVATION_CODE = 'ERROR_ACTIVATION_CODE';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FETCHING_FORGOT_PASSWORD = 'FETCHING_FORGOT_PASSWORD';
export const ERROR_FORGOT_PASSWORD = 'ERROR_FORGOT_PASSWORD';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const SET_FORGOT_MESSAGE = "SET_FORGOT_MESSAGE"
export const USER_REGISTERING = 'USER_REGISTERING';
export const USER_REGISTERED_ERROR = 'USER_REGISTERED_ERROR';
export const USER_REGISTERED = 'USER_REGISTERED';

// ------------------------------------
// Actions
// ------------------------------------



export function resetVerifyFormValue (status) {
	return {
		type: RESET_VERIFY_FORM_VALUE,
		showVerifyForm: status,
	}
}


export function accountVerifying (status) {
	return {
		type: ACCOUNT_VERIFYING,
		verifying: status
	}
}

export function accountVarified (response) {
	return {
		type: ACCOUNT_VERIFIED,
		accountVerifiedDetail: response
	}
}

export function userRegistered (response) {
	return {
		type: USER_REGISTERED,
		userRegistrationDetail: response
	}
}

export function userRegistering (status) {
	return {
		type: USER_REGISTERING,
		fetching: status
	}
}

export function userRegisteredError (status) {
	return {
		type: USER_REGISTERED_ERROR,
		error: status
	}
}

export function accountVerifyError (status) {
	return {
		type: ACCOUNT_VERIFY_ERROR,
		error: status
	}
}

export function setVerifyAccount (status) {
	return {
		type: SET_VERIFY_ACCOUNT,
		showVerifyForm: status
	}
}

export function setUserMail (mail) {
	return {
		type: SET_USER_MAIL,
		mail: mail
	}
}

export function sendingActivationCode (status) {
	return {
		type: SENDING_ACTIVATION_CODE,
		fetching: status
	}
}

export function activationCodeSend (response) {
	return {
		type: SEND_ACTIVATION_CODE,
		activationCodeDetail: response
	}
}

export function activationCodeError (status) {
	return {
		type: ERROR_ACTIVATION_CODE,
		error: status
	}
}

export function sendForgotPassword (status) {
	return {
		type: FORGOT_PASSWORD,
		forgotStatus: status
	}
}

export function sendForgotPasswordError (status) {
	return {
		type: ERROR_FORGOT_PASSWORD,
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

export function setForgotAlert(status, message) {
  return {
    type: SET_FORGOT_MESSAGE,
    forgotAlert: status,
    forgotMessage: message
  };
}

export function setForgotPasswordFetching (status) {
	return {
		type: FETCHING_FORGOT_PASSWORD,
		fetching: status
	}
}

//--------------------------------------------
// Action Creator
//--------------------------------------------


export const getForgotAlert = (forgotAlert,forgotMessage) =>{
	return (dispatch) =>{
		dispatch(setForgotAlert(forgotAlert,forgotMessage))
	}
}
export const resetVerifyForm = () => {
	return (dispatch) => {
		dispatch(resetVerifyFormValue(false));
  }
}

export const setContactType = (type) => {
	return (dispatch) => {
		dispatch(contactType(type));
	}
}



export const accountVerification = (values) => {
	return (dispatch) => {
		dispatch(accountVerifying(true));
		let url = `${Config.url}customerActivation`;
		let verificationData = new FormData();
		verificationData.append('email', values.Email);
		verificationData.append('activation_code', values.ActivationCode);
		axios({
		  method: 'post',
		  url: url,
		  timeout: 100000,
		  data: verificationData,
		  headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
		}).then(response => {
			if(typeof response.data !== 'undefined') {
				dispatch(setAlertMeassage(true, response.data.message));
			}
			dispatch(accountVarified(response.data));
			dispatch(accountVerifying(false));
		}).catch(error => {
			console.log(error)
			dispatch(setAlertMeassage(true, "Invalid activation code"));
   			dispatch(accountVerifying(false));
			dispatch(accountVerifyError(true));
		});
	}
}

export const resendActivationCode = (mail) => {
	return (dispatch) => {
		dispatch(sendingActivationCode(true));
		let url = `${Config.url}resendActivationEmail`;
		let resendCode = new FormData();
		resendCode.append('email', mail);
		axios({
		  method: 'post',
		  url: url,
		  timeout: 100000,
		  data: resendCode,
		  headers: {'token': Config.token,
       'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
		}).then(response => {
			if(typeof response.data !== 'undefined') {
				dispatch(setAlertMeassage(true, response.data.message));
			}
			dispatch(activationCodeSend(response.data));
			dispatch(sendingActivationCode(false));
		}).catch(error => {
			dispatch(setAlertMeassage(true, error.response.data.message));
			dispatch(sendingActivationCode(false));
			dispatch(activationCodeError(true));
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
	
  [SET_FORGOT_MESSAGE]: (state, action) => {
    return {
      ...state,
     forgotAlert : action.forgotAlert,
     forgotMessage : action.forgotMessage
    };
  },
  [ACCOUNT_VERIFYING]: (state, action) => {
    return {
      ...state,
      verifying: action.verifying
    };
  },
  [ACCOUNT_VERIFIED]: (state, action) => {
    return {
      ...state,
      accountVerifiedDetail: action.accountVerifiedDetail
    };
  },

  [USER_REGISTERING]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [USER_REGISTERED]: (state, action) => {
    return {
      ...state,
      userRegistrationDetail: action.userRegistrationDetail
    };
  },
  [USER_REGISTERED_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [ACCOUNT_VERIFY_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [SET_VERIFY_ACCOUNT]: (state, action) => {
    return {
      ...state,
      showVerifyForm: action.showVerifyForm
    };
  },
  [SET_USER_MAIL]: (state, action) => {
    return {
      ...state,
      mail: action.mail
    };
  },
  
  [RESET_VERIFY_FORM_VALUE]: (state, action) => {
    return {
      ...state,
      showVerifyForm: action.showVerifyForm
    };
  },
  [SENDING_ACTIVATION_CODE]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [SEND_ACTIVATION_CODE]: (state, action) => {
    return {
      ...state,
      activationCodeDetail: action.activationCodeDetail
    };
  },
  [ERROR_ACTIVATION_CODE]: activationCodeError,
  [ERROR_FORGOT_PASSWORD]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [FORGOT_PASSWORD]: (state, action) => {
    return {
      ...state,
      forgotStatus: action.status
    };
  },
	[SET_ALERT_MESSAGE]: (state, action) => {
	    return {
	        ...state,
	        showAlert: action.showAlert,
	        alertMessage: action.alertMessage
	    };
	},
	[FETCHING_FORGOT_PASSWORD]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
};



// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
	fetching: false,
	error: false,
	registerForm: false,
	showRegisterForm: false,
	showFacebookForm: false,
	contactType: 'Mobile',
	showVerifyForm: false,
	mail: '',
	verifying: false,
	accountVerifiedDetail: {},
	activationCodeDetail: {},
	forgotStatus: false,
	showAlert: false,
	alertMessage: "",
	userRegistrationDetail: {},
	forgotAlert : false,
	forgotMessage : "",
};

export default function OrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

