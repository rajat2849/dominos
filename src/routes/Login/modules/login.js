import axios from "axios";
import { browserHistory } from "react-router";

import querystring from "querystring";
import { Url } from "config/Config";
import { Config } from "../../../config/Config";
import {
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  saveSessionStorage
} from "../../../components/Helpers";
//import { request } from 'lib/ApiController';
import { translate } from "components/Helpers";
import { getCartItems } from "../../../store/cart";
import { get } from 'lodash';
import { sha256, sha224 } from 'js-sha256'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCHING_LOGIN_DETAIL = "FETCHING_LOGIN_DETAIL";
export const RECEIVED_LOGIN_DETAIL = "RECEIVED_LOGIN_DETAIL";
export const SHOW_REGISTER_FORM = "SHOW_REGISTER_FORM";
export const SHOW_FACEBOOK_FORM = "SHOW_FACEBOOK_FORM";
export const CONTACT_TYPE = "CONTACT_TYPE";
export const USER_REGISTERING = "USER_REGISTERING";
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_REGISTERED_ERROR = "USER_REGISTERED_ERROR";
export const SET_VERIFY_ACCOUNT = "SET_VERIFY_ACCOUNT";
export const SET_USER_MAIL = "SET_USER_MAIL";
export const RESET_REGISTER_FORM_VALUE = "RESET_REGISTER_FORM_VALUE";
export const RESET_VERIFY_FORM_VALUE = "RESET_VERIFY_FORM_VALUE";
export const ACCOUNT_VERIFYING = "ACCOUNT_VERIFYING";
export const ACCOUNT_VERIFIED = "ACCOUNT_VERIFIED";
export const ACCOUNT_VERIFY_ERROR = "ACCOUNT_VERIFY_ERROR";
export const SENDING_ACTIVATION_CODE = "SENDING_ACTIVATION_CODE";
export const SEND_ACTIVATION_CODE = "SEND_ACTIVATION_CODE";
export const ERROR_ACTIVATION_CODE = "ERROR_ACTIVATION_CODE";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FETCHING_FORGOT_PASSWORD = "FETCHING_FORGOT_PASSWORD";
export const ERROR_FORGOT_PASSWORD = "ERROR_FORGOT_PASSWORD";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const SET_FORGOT_MESSAGE = "SET_FORGOT_MESSAGE";
export const SET_DISABLE = "SET_DISABLE";
// ------------------------------------
// Actions
// ------------------------------------

export function setLoginDetail(status) {
  return {
    type: FETCHING_LOGIN_DETAIL,
    fetching: status
  };
}
export function setDisable(status) {
  return {
    type: SET_DISABLE,
    recaptcha: status
  };
}

export function receivedLoginDetail(payload) {
  return {
    type: RECEIVED_LOGIN_DETAIL,
    error: false,
    loginDetail: payload
  };
}

export function showRegisterForm(status) {
  return {
    type: SHOW_REGISTER_FORM,
    showRegisterForm: status
  };
}

export function showFacebookForm(status) {
  return {
    type: SHOW_FACEBOOK_FORM,
    showFacebookForm: status
  };
}

export function resetRegisterFormValue(status) {
  return {
    type: RESET_REGISTER_FORM_VALUE,
    showRegisterForm: status
  };
}

export function resetVerifyFormValue(status) {
  return {
    type: RESET_VERIFY_FORM_VALUE,
    showVerifyForm: status
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

export function setVerifyAccount(status) {
  return {
    type: SET_VERIFY_ACCOUNT,
    showVerifyForm: status
  };
}

export function setUserMail(mail) {
  return {
    type: SET_USER_MAIL,
    mail: mail
  };
}

export function sendingActivationCode(status) {
  return {
    type: SENDING_ACTIVATION_CODE,
    fetching: status
  };
}

export function activationCodeSend(response) {
  return {
    type: SEND_ACTIVATION_CODE,
    activationCodeDetail: response
  };
}

export function activationCodeError(status) {
  return {
    type: ERROR_ACTIVATION_CODE,
    error: status
  };
}

export function sendForgotPassword(status) {
  return {
    type: FORGOT_PASSWORD,
    forgotStatus: status
  };
}

export function sendForgotPasswordError(status) {
  return {
    type: ERROR_FORGOT_PASSWORD,
    error: status
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

export function setForgotPasswordFetching(status) {
  return {
    type: FETCHING_FORGOT_PASSWORD,
    fetching: status
  };
}

//--------------------------------------------
// Action Creator
//--------------------------------------------

export const loggedIn = values => {
  console.log(values)
  return dispatch => {
    dispatch(setLoginDetail(true));
    let url = `${Config.url}auth`;
    let loginData = new FormData();
    // let email = values.Email
    // if(get(values,"Social")){
    //   loginData.append("email", values.Email);
    //   loginData.append("password", "");
    //   loginData.append("social", values.Social);
    //   loginData.append("bundle", values.Bundle);
    // }
    // else{
    loginData.append("email", values.Email);
    loginData.append("password", values.Password);
    // }
  
    axios({
      method: "post",
      url: url,
      timeout: 100000,
      data: loginData,
      headers: {
        token: Config.token,
        "device-type": Config.devicetype,
        Accept: Config.Accept,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        let userData = {};
        userData.firstname = response.data.data.firstname;
        userData.lastname = response.data.data.lastname;
        userData.email = response.data.data.email;
        userData.phoneNumber = response.data.data.contact_number;
        userData.contact_ext = response.data.data.contact_ext;
        userData.contact_type = response.data.data.contact_type;
        userData.customer_id = response.data.data.customer_id;
        userData.dob = response.data.data.dob;
        userData.prefix = response.data.data.prefix;
        userData.message = response.data.data.message;
        userData.status = response.data.data.status;
        let Page = JSON.parse(sessionStorage.getItem("fromPage"));
        saveLocalStorage("user", userData);
        saveSessionStorage("userData", userData);
        saveLocalStorage("receivedLoginDetail", response.data.data);
        saveLocalStorage("confirmOrderAtViewCart", true);
        dispatch(receivedLoginDetail(response.data.data));
        dispatch(setLoginDetail(false));
        dispatch(getCartItems(response.data.data.customer_id));
        let page = getLocalStorage("page");
        // let cartItems = []
        // localStorage.setItem('cartItems',JSON.stringify(cartItems))
        // removeLocalStorage('order');
        // removeLocalStorage('deliveryAddress');
        //  removeLocalStorage('store');
        if (page === "dashboard") {
          browserHistory.push(Url.DASHBOARD);
        } else if (page === "menu") {
          browserHistory.push(Url.VIEW_CART);
        }
      })
      .catch(error => {
        dispatch(setLoginDetail(false));
        dispatch(setAlertMeassage(true, "Invalid login or password."));
      });
  };
};
export const getForgotAlert = (forgotAlert, forgotMessage) => {
  return dispatch => {
    dispatch(setForgotAlert(forgotAlert, forgotMessage));
  };
};

export const Recaptcha = status => {
  return dispatch => {
    dispatch(setDisable(status));
  };
};

export const registerForm = () => {
  return dispatch => {
    dispatch(showRegisterForm(true));
  };
};

export const facebookForm = () => {
  return dispatch => {
    dispatch(showFacebookForm(true));
  };
};

export const resetRegisterForm = () => {
  return dispatch => {
    dispatch(resetRegisterFormValue(false));
  };
};

export const resetVerifyForm = () => {
  return dispatch => {
    dispatch(resetVerifyFormValue(false));
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
    //bodyFormData.append('birthdate', values.Dob);
    //bodyFormData.append('contact_type', values.MobileType);
    // bodyFormData.append('chknewsletter', 'no');
    //bodyFormData.append('contact_ext', ext);
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

export const accountVerification = values => {
  return dispatch => {
    dispatch(accountVerifying(true));
    let url = `${Config.url}customerActivation`;
    let verificationData = new FormData();
    verificationData.append("email", values.Email);
    verificationData.append("activation_code", values.ActivationCode);
    axios({
      method: "post",
      url: url,
      timeout: 100000,
      data: verificationData,
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
        dispatch(accountVarified(response.data));
        dispatch(accountVerifying(false));
        //browserHistory.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
        dispatch(setAlertMeassage(true, "Invalid activation code"));
        dispatch(accountVerifying(false));
        dispatch(accountVerifyError(true));
      });
  };
};

export const resendActivationCode = mail => {
  return dispatch => {
    dispatch(sendingActivationCode(true));
    let url = `${Config.url}resendActivationEmail`;
    let resendCode = new FormData();
    resendCode.append("email", mail);
    axios({
      method: "post",
      url: url,
      timeout: 100000,
      data: resendCode,
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
        dispatch(activationCodeSend(response.data));
        dispatch(sendingActivationCode(false));
      })
      .catch(error => {
        dispatch(setAlertMeassage(true, error.response.data.message));
        dispatch(sendingActivationCode(false));
        dispatch(activationCodeError(true));
      });
  };
};

export const userForgotPassword = values => {
  return dispatch => {
    dispatch(setForgotPasswordFetching(true));
    let url = `${Config.url}forgetPassword`;
    axios({
      method: "post",
      url: url,
      timeout: 100000,
      data: querystring.stringify({ email: values }),
      headers: {
        token: Config.token,
        "device-type": Config.devicetype,
        Accept: Config.Accept,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        if (typeof response.data !== "undefined") {
          dispatch(
            setAlertMeassage(true, translate("An email sent to ") + values)
          );
          dispatch(getForgotAlert(true, "Email sent Successfully"));
        }
        dispatch(setForgotPasswordFetching(false));
        dispatch(sendForgotPassword(true));
      })
      .catch(error => {
        console.log(error);
        dispatch(getForgotAlert(false, "Invalid email"));
        dispatch(setAlertMeassage(true, translate("Invalid email address")));
        dispatch(setForgotPasswordFetching(false));
        dispatch(sendForgotPasswordError(true));
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
  [FETCHING_LOGIN_DETAIL]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_LOGIN_DETAIL]: (state, action) => {
    return {
      ...state,
      error: action.error,
      loginDetail: action.loginDetail
    };
  },

  [SET_DISABLE]: (state, action) => {
    return {
      ...state,
      recaptcha: action.recaptcha
    };
  },
  [SET_FORGOT_MESSAGE]: (state, action) => {
    return {
      ...state,
      forgotAlert: action.forgotAlert,
      forgotMessage: action.forgotMessage
    };
  },
  [SHOW_REGISTER_FORM]: (state, action) => {
    return {
      ...state,
      showRegisterForm: action.showRegisterForm
    };
  },
  [SHOW_FACEBOOK_FORM]: (state, action) => {
    return {
      ...state,
      showFacebookForm: action.showFacebookForm
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
  [RESET_REGISTER_FORM_VALUE]: (state, action) => {
    return {
      ...state,
      showRegisterForm: action.showRegisterForm
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
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  fetching: false,
  error: false,
  loginDetail: "",
  registerForm: false,
  showRegisterForm: false,
  showFacebookForm: false,
  contactType: "Mobile",
  showVerifyForm: false,
  mail: "",
  verifying: false,
  accountVerifiedDetail: {},
  activationCodeDetail: {},
  forgotStatus: false,
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
