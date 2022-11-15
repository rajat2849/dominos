import axios from "axios";
import { browserHistory } from "react-router";

import querystring from "querystring";

import { Config } from "../../../config/Config";
import {
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from "../../../components/Helpers";
//import { request } from 'lib/ApiController';
import { translate } from "components/Helpers";
import { getCartItems } from "../../../store/cart";
import { Url } from "config/Config";

// ------------------------------------
// Constants
// ------------------------------------

export const SHOW_REGISTER_FORM = "SHOW_REGISTER_FORM";
export const CONTACT_TYPE = "CONTACT_TYPE";
export const USER_REGISTERING = "USER_REGISTERING";
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_REGISTERED_ERROR = "USER_REGISTERED_ERROR";
export const RESET_REGISTER_FORM_VALUE = "RESET_REGISTER_FORM_VALUE";
export const ACCOUNT_VERIFYING = "ACCOUNT_VERIFYING";
export const ACCOUNT_VERIFIED = "ACCOUNT_VERIFIED";
export const ACCOUNT_VERIFY_ERROR = "ACCOUNT_VERIFY_ERROR";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const SET_FORGOT_MESSAGE = "SET_FORGOT_MESSAGE";
export const SET_VERIFY_ACCOUNT = "SET_VERIFY_ACCOUNT";
export const SET_DISABLE = "SET_DISABLE";
export const SET_USER_MAIL = "SET_USER_MAIL";
// ------------------------------------
// Actions
// ------------------------------------

export function showRegisterForm(status) {
  return {
    type: SHOW_REGISTER_FORM,
    showRegisterForm: status
  };
}

export function setDisable(status) {
  return {
    type: SET_DISABLE,
    recaptcha: status
  };
}

export function resetRegisterFormValue(status) {
  return {
    type: RESET_REGISTER_FORM_VALUE,
    showRegisterForm: status
  };
}

export function contactType(type) {
  return {
    type: CONTACT_TYPE,
    contactType: type
  };
}

export function userRegistering(status) {
  return {
    type: USER_REGISTERING,
    fetching: status
  };
}

export function userRegistered(response) {
  return {
    type: USER_REGISTERED,
    userRegistrationDetail: response
  };
}

export function userRegisteredError(status) {
  return {
    type: USER_REGISTERED_ERROR,
    error: status
  };
}

export function accountVerifying(status) {
  return {
    type: ACCOUNT_VERIFYING,
    verifying: status
  };
}

export function setVerifyAccount(status) {
  return {
    type: SET_VERIFY_ACCOUNT,
    showVerifyForm: status
  };
}

export function accountVarified(response) {
  return {
    type: ACCOUNT_VERIFIED,
    accountVerifiedDetail: response
  };
}

export function accountVerifyError(status) {
  return {
    type: ACCOUNT_VERIFY_ERROR,
    error: status
  };
}

export function setUserMail(mail) {
  return {
    type: SET_USER_MAIL,
    mail: mail
  };
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

//--------------------------------------------
// Action Creator
//--------------------------------------------

export const getForgotAlert = (forgotAlert, forgotMessage) => {
  return dispatch => {
    dispatch(setForgotAlert(forgotAlert, forgotMessage));
  };
};

export const Recaptcha = (status) => {
  return dispatch => {
    dispatch(setDisable(status));
  };
};

export const registerForm = () => {
  return dispatch => {
    dispatch(showRegisterForm(true));
  };
};

export const resetRegisterForm = () => {
  return dispatch => {
    dispatch(resetRegisterFormValue(false));
  };
};

export const setContactType = type => {
  return dispatch => {
    dispatch(contactType(type));
  };
};

export const userRegistration = values => {
  return dispatch => {
    dispatch(userRegistering(true));
    /*
     *	setting user mail to get at Login component in case to resend code to user.
     */
    dispatch(setUserMail(values.Email));
    let ext = "";
    if (values.Ext) {
      ext = values.Ext;
    }
    let url = `${Config.url}register`;
    let bodyFormData = new FormData();
    bodyFormData.append("firstname", values.Firstname);
    bodyFormData.append("lastname", values.Lastname);
    bodyFormData.append("contact_number", values.Number);
    bodyFormData.append("email", values.Email);
    bodyFormData.append("password", values.Password);
    bodyFormData.append("password_confirmation", values.Confirmpassword);
    bodyFormData.append("birthdate", values.DateOfBirth);
    bodyFormData.append("contact_type", values.MobileType);
    // bodyFormData.append('chknewsletter', 'no');
    bodyFormData.append("contact_ext", values.ext);
    axios({
      method: "post",
      url: url,
      timeout: 100000,
      data: bodyFormData,
      headers: {
        token: Config.token,
        "device-type": Config.devicetype,
        Accept: Config.Accept,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        if (typeof response.data !== "undefined") {
          dispatch(setAlertMeassage(true, response.data.message));
        }
        /*
         *  dispatch an action to set a props to open verify account page
         */
        dispatch(setVerifyAccount(true));
        dispatch(showRegisterForm(false));
        dispatch(userRegistered(response.data));
        dispatch(userRegistering(false));
      })
      .catch(error => {
        // setting custom message to as api returns the network error with 400 bad request
        dispatch(setAlertMeassage(true, "This customer email already exists"));
        dispatch(setVerifyAccount(false));
        dispatch(showRegisterForm(false));
        dispatch(userRegistering(false));
        dispatch(userRegisteredError(true));
      });
  };
};

export const resetAlertBox = (showAlert, message) => {
  return dispatch => {
    dispatch(setAlertMeassage(showAlert, message));
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_FORGOT_MESSAGE]: (state, action) => {
    return {
      ...state,
      forgotAlert: action.forgotAlert,
      forgotMessage: action.forgotMessage
    };
  },
  [SET_DISABLE]: (state, action) => {
    return {
      ...state,
      recaptcha: action.recaptcha
    };
  },
  [SHOW_REGISTER_FORM]: (state, action) => {
    return {
      ...state,
      showRegisterForm: action.showRegisterForm
    };
  },
  [CONTACT_TYPE]: (state, action) => {
    return {
      ...state,
      contactType: action.contactType
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
  [SET_USER_MAIL]: (state, action) => {
    return {
      ...state,
      mail: action.mail
    };
  },
  [SET_VERIFY_ACCOUNT]: (state, action) => {
    return {
      ...state,
      showVerifyForm: action.showVerifyForm
    };
  },
  [RESET_REGISTER_FORM_VALUE]: (state, action) => {
    return {
      ...state,
      showRegisterForm: action.showRegisterForm
    };
  },

  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  fetching: false,
  error: false,
  registerForm: false,
  showRegisterForm: false,
  contactType: "Mobile",
  mail: "",
  verifying: false,
  showAlert: false,
  alertMessage: "",
  userRegistrationDetail: {},
  forgotAlert: false,
  forgotMessage: "",
  recaptcha: false
};

export default function OrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
