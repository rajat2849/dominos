import axios from "axios";
// import { browserHistory } from 'react-router';
import dateArray from "moment-array-dates";
import moment from "moment";
import { sha256 } from 'js-sha256'
import { Config, Url } from "config/Config";
import {
  getLocalStorage,
  saveLocalStorage,
  translate
} from "components/Helpers";

// ------------------------------------
// Constants
// ------------------------------------
export const SET_LATE_ORDER_DATE_TIME = "SET_LATE_ORDER_DATE_TIME";
export const SET_SELECTED_TIME = "SET_SELECTED_TIME";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const APPLYING_VOUCHER_CODE = "APPLYING_VOUCHER_CODE";
export const APPLIED_VOUCHER_CODE = "APPLIED_VOUCHER_CODE";
export const FAILED_VOUCHER_CODE = "FAILED_VOUCHER_CODE";
export const COUPON_PRODUCT_DETAIL = "COUPON_PRODUCT_DETAIL";
export const SENDING_IMAGE = "SENDING_IMAGE";
export const FORM = "FORM";
export const PAYMENT_METHODS = "PAYMENT_METHODS";
export const SERVICE_METHOD_DELIVERY = "SERVICE_METHOD_DELIVERY";
export const SERVICE_METHOD_CARRY = "SERVICE_METHOD_CARRY";
export const FETCH_TIMESTAMP = "FETCH_TIMESTAMP";
export const FETCHING_TIMESTAMP = "FETCHING_TIMESTAMP";
export const FETCHING_DATA = "FETCHING_DATA";
export const GET_TAX = "GET_TAX";
export const GET_TAX_MESSAGE = "GET_TAX_MESSAGE";
export const GET_TAX_MESSAGE_ID = "GET_TAX_MESSAGE_ID";
export const SET_MODAL = "SET_MODAL";
export const SET_DELIVERY = "SET_DELIVERY";
export const GET_CONFIG = "GET_CONFIG";
export const SET_CONFIG = "SET_CONFIG";
export const SET_ORDER_PLACE_STATUS = "SET_ORDER_PLACE_STATUS"


// ------------------------------------
// Actions
// ------------------------------------
export function setPaymentMethods(data) {
  return {
    type: PAYMENT_METHODS,
    paymentMethods: data
  };
}

export const setModalProps = modal => {
  return {
    type: SET_MODAL,
    modal: modal
  };
};
export const setDeliveryProps = delivery => {
  return {
    type: SET_DELIVERY,
    delivery: delivery
  };
};

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


export function getTaxProduct(taxData) {
  return {
    type: GET_TAX,
    taxData: taxData
  };
}

export function getTaxMessage(message) {
  return {
    type: GET_TAX_MESSAGE,
    message: message
  };
}

export function getTaxMessageId(messageId) {
  return {
    type: GET_TAX_MESSAGE_ID,
    messageId: messageId
  };
}

export function setLateOrderDateTime(date, time) {
  return {
    type: SET_LATE_ORDER_DATE_TIME,
    date: date,
    time: time
  };
}
export function sendImage(status) {
  return {
    type: SENDING_IMAGE,
    sending: status
  };
}
export function setSelectedTime(time) {
  return {
    type: SET_SELECTED_TIME,
    selectedTime: time
  };
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

export function applyingVoucherCode(status) {
  return {
    type: APPLYING_VOUCHER_CODE,
    applying: status
  };
}

export function appliedVoucherCode(response) {
  return {
    type: APPLIED_VOUCHER_CODE,
    voucherCodeDetail: response
  };
}

export function failedVoucherCode(status) {
  return {
    type: FAILED_VOUCHER_CODE,
    error: status
  };
}

export function setCouponProduct(product) {
  return {
    type: COUPON_PRODUCT_DETAIL,
    couponProduct: product
  };
}

export const formItems = value => {
  return {
    type: FORM,
    items: value
  };
};

export const setFreeDeliveryState = status => {
  return {
    type: SERVICE_METHOD_DELIVERY,
    freeDelivery: status
  };
};

export const setCarryOutState = status => {
  return {
    type: SERVICE_METHOD_CARRY,
    carryoutDelivery: status
  };
};
export function fetchingTimeStamp(status) {
  return {
    type: FETCHING_TIMESTAMP,
    fetchingTimeStamp: status
  };
}

export function fetchingData(status) {
  return {
    type: FETCHING_DATA,
    fetchingData: status
  };
}

export function receivedTimeStamp(timeStamp) {
  return {
    type: FETCH_TIMESTAMP,
    timeStamp: timeStamp
  };
}


export function sentOrderPlacedStatus(value) {
  return {
    type: SET_ORDER_PLACE_STATUS,
    value: value
  };
}


// ------------------------------------
// Action creators
// ------------------------------------
export const setProps = key => {
  return dispatch => {
    if (key == "carryout") {
      dispatch(setFreeDeliveryState(false));
      dispatch(setCarryOutState(true));
    } else {
      dispatch(setFreeDeliveryState(true));
      dispatch(setCarryOutState(false));
    }
  };
};

export const fetchTimeStamp = () => {
  return dispatch => {
    dispatch(fetchingTimeStamp(true));
    let url = `${Config.url}getCurrentTimeStamp`;
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
        let timeStamp = "";
        timeStamp = response.data.data.timestamp;
        saveLocalStorage("timeStamp", timeStamp);
        dispatch(receivedTimeStamp(timeStamp));
        dispatch(fetchingTimeStamp(false));
      })
      .catch(error => {
        dispatch(fetchingTimeStamp(false));
      });
  };
};

export const fetchConfig = () => {
  return dispatch => {
     dispatch(fetchingTimeStamp(true));
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
          
          dispatch(getConfig(response.data.data.coupons.data));
          dispatch(setConfig(response.data.data));
           saveLocalStorage("configData", response.data.data);
             dispatch(fetchingTimeStamp(false));
      })

      .catch(error => {
     dispatch(fetchingTimeStamp(false));
      });
  };
};


export const calculateLateOrderDateTime = values => {
  return dispatch => {
    let time = [];
    let date = [];
    let from = "";
    date = dateArray.nextNDays(6, "DD-MM-YYYY", true);
    if (values == "today" || values == "Today") {
      let currentMinute = moment()
        .add(60, "minutes")
        .format("mm");
      let currentHour = moment()
        .add(60, "minutes")
        .format("HH");
      while (currentMinute % 15 != 0) {
        currentMinute = parseInt(currentMinute) + 1;
        if (currentMinute >= 60) {
          currentHour = parseInt(currentHour) + 1;
          currentMinute = "00";
        }
      }
      from = currentHour + ":" + currentMinute;
    } else {
      from = Config.orderStartTime;
    }
    while (from <= Config.orderEndTime) {
      time.push(from);
      from = moment(from, "HH:mm")
        .add(15, "minutes")
        .format("HH:mm");
    }
    dispatch(setSelectedTimeState(time[0]));
    dispatch(setLateOrderDateTime(date, time));
  };
};

export const setSelectedTimeState = values => {
  return dispatch => {
    dispatch(setSelectedTime(values));
  };
};

export const resetAlertBox = (showAlert, message) => {
  return dispatch => {
    dispatch(setAlertMeassage(showAlert, message));
  };
};

export const setModal = modal => {
  return dispatch => {
    dispatch(setModalProps(modal));
  };
};

export const setDelivery = delivery => {
  return dispatch => {
    dispatch(setDeliveryProps(delivery));
  };
};

export const applyVoucherCode = code => {
  return dispatch => {
    dispatch(applyingVoucherCode(true));
    let couponDetail = {};
    let user = getLocalStorage("user");
    let loginDetail = getLocalStorage("receivedLoginDetail");
    let url = `${Config.url}getProductByCouponCode`;
    return new Promise(resolve => {
      if (
        loginDetail !== null &&
        typeof loginDetail !== "undefinde" &&
        typeof loginDetail.customer_id !== "undefinde" &&
        loginDetail.customer_id !== ""
      ) {
        axios
          .get(url, {
            params: {
              coupon_code: code,
              email: user.email,
              customer_id: loginDetail.customer_id
            },
            headers: {
              token: Config.token,
              "device-type": Config.devicetype,
              Accept: Config.Accept,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            let sku = "";
            if (
              typeof response !== "undefinde" &&
              typeof response.data !== "undefinde" &&
              typeof response.data.data !== "undefinde" &&
              response.data.data.sku !== ""
            ) {
              sku = response.data.data.sku;
              dispatch(applyingVoucherCode(false));
              dispatch(appliedVoucherCode(response.data.data));
              couponDetail.couponCode = sku;
              couponDetail.isCoupon = true;
              saveLocalStorage("couponDetail", couponDetail);
            }
            resolve(true);
          })
          .catch(error => {
            if (!error.response) {
              const message = translate("Not Found");
              dispatch(setAlertMeassage(true, message));
            }
            dispatch(applyingVoucherCode(false));
            dispatch(failedVoucherCode(true));
            resolve(true);
          });
      } else {
        axios
          .get(url, {
            params: {
              coupon_code: code,
              email: user.email
            },
            headers: {
              token: Config.token,
              "device-type": Config.devicetype,
              Accept: Config.Accept,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            let sku = "";
            if (
              typeof response !== "undefinde" &&
              typeof response.data !== "undefinde" &&
              typeof response.data.data !== "undefinde" &&
              response.data.data.sku !== ""
            ) {
              sku = response.data.data.sku;
              dispatch(applyingVoucherCode(false));
              dispatch(appliedVoucherCode(response.data.data));
            }
            resolve(true);
          })
          .catch(error => {
            if (!error.response) {
              const message = translate("Not Found");
              dispatch(setAlertMeassage(true, message));
            }
            dispatch(applyingVoucherCode(false));
            dispatch(failedVoucherCode(true));
            resolve(true);
          });
      }
    });
  };
};

export const getCouponProductDetail = sku => {
  return dispatch => {
    return new Promise(resolve => {
      let url = `${Config.url}getDetailPromotions`;
      axios
        .get(url, {
          params: { sku: sku },
          headers: {
            token: Config.token,
            "device-type": Config.devicetype,
            Accept: Config.Accept,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          let productDetail = {};
          if (
            typeof response.data !== "undefined" &&
            typeof response.data.data !== "undefined"
          ) {
            productDetail = response.data.data;
          }
          if(response.data.data.sku === "FRB75K"){
            saveLocalStorage("freeProductData", productDetail);
          }
          dispatch(setCouponProduct(productDetail));
          resolve(true);
        })
        .catch(error => {
          resolve(true);
        });
    });
  };
};

export const getPaymentMethod = () => {
  return dispatch => {
    return new Promise(resolve => {
      let url = `${Config.url}getPaymentMethod`;
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
          dispatch(setPaymentMethods(response.data.data));
          resolve(true);
        })
        .catch(error => {
          resolve(true);
        });
    });
  };
};
export const getTaxData = () => {
  return dispatch => {
    dispatch(fetchingData(true));
    return new Promise(resolve => {
      let url = `${Config.url}getDeliveryProduct`;
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
          dispatch(getTaxProduct(response.data.data));
          dispatch(getTaxMessage(response.data.message));
          dispatch(getTaxMessageId(response.data.message_idn));
          dispatch(fetchingData(false));
          resolve(true);
        })
        .catch(error => {
          resolve(true);
          dispatch(fetchingData(false));
        });
    });
  };
};


// sent otp for order placing verofication.
export const sentOrderVeriOtp = (data) => {
  const formData = new FormData();
  formData.append("email" , data.email)
  formData.append("mobile" , data.mobile)

  return dispatch => {
    return new Promise(resolve => {
      let url = `https://migrationdev.dominos.id/infdominos/api/sendWhatsApOTP`;
      return axios({
        method: 'post',
        url,
        headers: {
          token: Config.token,
          "device-type": Config.devicetype,
          Accept: Config.Accept,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"  
        },
        data : formData,
      }).then(response => {
          dispatch(sentOrderPlacedStatus("otpSent"))
          resolve(true);
        })
        .catch(error => {
          resolve(true);
        });
    });
  };
};


// verify otp for order placed otp verification.
export const verifyOrderVeriOtp = (data) => {
  const formData = new FormData();
  const key = `domino-${data.email}incaendo-indo`;
  let convertToSha = sha256.hmac(key, data.email);
  formData.append("email" , data.email);
  formData.append("mobile" , data.mobile);
  formData.append("otp" , data.otp);
  formData.append("bundle" ,convertToSha );

  return dispatch => {
    return new Promise(resolve => {
      let url = `https://migrationdev.dominos.id/infdominos/api/getVerifyOtp`;
       axios({
        method: 'post',
        url,
        headers: {
          token: Config.token,
          "device-type": Config.devicetype,
          Accept: Config.Accept,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"  
        },
        data : formData
      })
        .then(response => {
          dispatch(sentOrderPlacedStatus(""));
          resolve("success");
        })
        .catch(err => {
          dispatch(sentOrderPlacedStatus("invalidOtp"));
          resolve(false);
        });
    });
  };
};



export const sendingImage = values => {
  return dispatch => {
    dispatch(sendImage(showAlert, message));
  };
};

export const detailForm = value => {
  return dispatch => {
    let array = [];
    let data = JSON.parse(localStorage.getItem("receivedLoginDetail"));
    array.push(data);
    dispatch(formItems(array));
  };
  saveLocalStorage("details", array);
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PAYMENT_METHODS]: (state, action) => {
    return {
      ...state,
      paymentMethods: action.paymentMethods
    };
  },
  [SET_LATE_ORDER_DATE_TIME]: (state, action) => {
    return {
      ...state,
      date: action.date,
      time: action.time
    };
  },
  [SET_SELECTED_TIME]: (state, action) => {
    return {
      ...state,
      selectedTime: action.selectedTime
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  },
  [APPLYING_VOUCHER_CODE]: (state, action) => {
    return {
      ...state,
      applying: action.applying
    };
  },
  [APPLIED_VOUCHER_CODE]: (state, action) => {
    return {
      ...state,
      voucherCodeDetail: action.voucherCodeDetail
    };
  },
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
  [FAILED_VOUCHER_CODE]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [COUPON_PRODUCT_DETAIL]: (state, action) => {
    return {
      ...state,
      couponProduct: action.couponProduct
    };
  },
  [SENDING_IMAGE]: (state, action) => {
    return {
      ...state,
      sending: action.sending
    };
  },

  [FORM]: (state, action) => {
    return {
      ...state,
      items: action.items
    };
  },

  [SERVICE_METHOD_DELIVERY]: (state, action) => {
    return {
      ...state,
      freeDelivery: action.freeDelivery
    };
  },

  [SERVICE_METHOD_CARRY]: (state, action) => {
    return {
      ...state,
      carryoutDelivery: action.carryoutDelivery
    };
  },
  [FETCHING_TIMESTAMP]: (state, action) => {
    return {
      ...state,
      fetchingTimeStamp: action.fetchingTimeStamp
    };
  },
  [FETCHING_DATA]: (state, action) => {
    return {
      ...state,
      fetchingData: action.fetchingData
    };
  },
  [FETCH_TIMESTAMP]: (state, action) => {
    return {
      ...state,
      timeStamp: action.timeStamp
    };
  },
  [GET_TAX]: (state, action) => {
    return {
      ...state,
      taxData: action.taxData
    };
  },
  [GET_TAX_MESSAGE]: (state, action) => {
    return {
      ...state,
      message: action.message
    };
  },
  [GET_TAX_MESSAGE_ID]: (state, action) => {
    return {
      ...state,
      messageId: action.messageId
    };
  },
  [SET_MODAL]: (state, action) => ({
    ...state,
    modal: action.modal
  }),
    [SET_DELIVERY]: (state, action) => ({
    ...state,
    delivery: action.delivery
  }),

  [SET_ORDER_PLACE_STATUS]: (state, action) => ({
    ...state,
    orderPlaceStatus: action.value
  }),

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  date: [],
  time: [],
  selectedTime: "",
  showAlert: false,
  alertMessage: "",
  error: false,
  applying: false,
  voucherCodeDetail: [],
  couponProduct: {},
  sending: false,
  items: {},
  paymentMethods: [],
  carryoutDelivery: false,
  freeDelivery: false,
  fetchingTimeStamp: false,
  timeStamp: null,
  taxData: null,
  fetchingData: false,
  message: null,
  modal: false,
  messageId: null,
  delivery:false,
  config:{},
  configuration:{},
  orderPlaceStatus : '' // otpSent, invalidOtp
};

export default function ViewCartReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
