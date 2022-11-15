import axios from "axios";
import { browserHistory } from "react-router";

import { Url, Config } from "../../../config/Config";
import {
  getLocalStorage,
  saveLocalStorage,
  getAllArchive,
  generateGuestAddress
} from "components/Helpers";
import { translate } from "components/Helpers";
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_SURVEY_ADDRESS = "FETCHING_SURVEY_ADDRESS";
export const RECEIVED_SURVEY_DATA = "RECEIVED_SURVEY_DATA";
export const ADDRESS_SURVEY_ERROR = "ADDRESS_SURVEY_ERROR";
export const UPDATE_FORM_STATUS = "UPDATE_FORM_STATUS";
export const SET_FORM_STATE = "SET_FORM_STATE";
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const SET_USER_ADDRESS = "SET_USER_ADDRESS";
export const RESET_FORM_STATE = "RESET_FORM_STATE";
export const RESET_SURVEY_ADDRESS = "RESET_SURVEY_ADDRESS";
export const SET_DELIVERY_ADDRESS = "SET_DELIVERY_ADDRESS";
export const SET_USER_CENTER_POINT = "SET_USER_CENTER_POINT";
export const FETCHING_NEAREST_STORE = "FETCHING_NEAREST_STORE";
export const RECEIVED_NEAREST_STORE = "RECEIVED_NEAREST_STORE";
export const ERROR_NEAREST_STORE = "ERROR_NEAREST_STORE";
export const SET_LOADER_FLAG = "SET_LOADER_FLAG";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const RESET_IS_SELECT_VALUE = "RESET_IS_SELECT_VALUE";
export const FETCHING_CUSTOMER_ADDRESS = "FETCHING_CUSTOMER_ADDRESS";
export const RECEIVED_CUSTOMER_ADDRESS = "RECEIVED_CUSTOMER_ADDRESS";
export const SET_CUSTOMER_ADDRESS = "SET_CUSTOMER_ADDRESS";

// ------------------------------------
// Actions
// ------------------------------------
export function fetchSurveyAddressDetail() {
  return {
    type: FETCHING_SURVEY_ADDRESS,
    fetching: true
  };
}

export function setCustomerAddress() {
  return {
    type: SET_CUSTOMER_ADDRESS,
    showLoader: true
  };
}

export function fetchCustomerAddressDetail() {
  return {
    type: FETCHING_CUSTOMER_ADDRESS,
    fetching: true,
    showLoader: false
  };
}

export function receivedSurveyAddressDetail(resp, data) {
  return {
    type: RECEIVED_SURVEY_DATA,
    fetching: false,
    surveyAddress: resp,
    deliveryAddress: data,
    error: false
  };
}

export function receivedCustomerAddressDetail(resp, data) {
  return {
    type: RECEIVED_CUSTOMER_ADDRESS,
    fetching: false,
    customerAddress: data,
    error: false,
    showLoader: true
  };
}

export function receivedSurveyAddressErrorDetail() {
  return {
    type: ADDRESS_SURVEY_ERROR,
    fetching: false,
    error: true,
    surveyAddress: [],
    deliveryAddress: []
  };
}

export function updateFormStatus(status) {
  return {
    type: UPDATE_FORM_STATUS,
    showDeliveryForm: status
  };
}

export function formProps(values) {
  return {
    type: SET_FORM_STATE,
    isSelectValue: true,
    selectedValue: values
  };
}

export const setGeoCenterPoint = centerPoint => {
  // console.log("setGeoCenterPoint-========", centerPoint)
  return dispatch => {
    dispatch(setCenterPoint(centerPoint));
  };
};

export function resetformState() {
  return {
    type: RESET_FORM_STATE,
    isSelectValue: false,
    selectedValue: "",
    storeDetail: {},
    fetchDeliveryAddress: false
  };
}

export function resetSurveyAddress() {
  return {
    type: RESET_SURVEY_ADDRESS,
    surveyAddress: []
  };
}

export const setGeoUserAddress = (address, addressHeading) => {
  return dispatch => {
    dispatch(setUserAddress(address, addressHeading));
  };
};

export function currentLocation(location) {
  return {
    type: SET_CURRENT_LOCATION,
    currentLocation: location
  };
}

export function setUserAddress(address, addressHeading) {
  return {
    type: SET_USER_ADDRESS,
    userAddress: address,
    userAddressHeading: addressHeading
  };
}

export function setCenterPoint(centerPoint) {
  return {
    type: SET_USER_CENTER_POINT,
    centerPoint: centerPoint
  };
}

/*
 *  fetching is set to show loader before going to menu page
 *  please add a loader on delivery page
 */
export function setDeliveryAddress(fetching, error) {
  return {
    type: SET_DELIVERY_ADDRESS,
    fetchDeliveryAddress: fetching,
    error: error,
    showLoader: false
  };
}

export function setNearestStore(storeDetail) {
  return {
    type: RECEIVED_NEAREST_STORE,
    storeDetail: storeDetail
  };
}

export function setNearestStoreFetching(status) {
  return {
    type: FETCHING_NEAREST_STORE,
    fetching: status
  };
}

export function setNearestStoreError(status) {
  return {
    type: ERROR_NEAREST_STORE,
    error: status
  };
}

export function setLoaderFlag(status) {
  return {
    type: SET_LOADER_FLAG,
    loaderFlag: status
  };
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

/*
 *  Reset the isSelectValue and storeDetail props to go back user to the initial view of delivery address page
 *  if addCustomerDeliveryAddress api returns false.
 */
export function resetIsSelectValueProp(status) {
  return {
    type: RESET_IS_SELECT_VALUE,
    isSelectValue: status,
    storeDetail: ""
  };
}

// ------------------------------------
// Action creators
// ------------------------------------
export const fetchSurveyAddress = values => {
  return dispatch => {
    dispatch(fetchSurveyAddressDetail());
    let url = `${Config.url}getSurveyAddress`;
    axios
      .get(url, {
        params: {
          street: values
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
        let resp = [];
        if (
          typeof response !== "undefined" &&
          typeof response.data !== "undefined" &&
          typeof response.data.data !== "undefined" &&
          response.data.data.length > 0
        ) {
          resp = response.data.data;
          let data = [];
          resp.map((item, index) => {
            data.push({ [item.id]: item.survey_address });
          });
          dispatch(receivedSurveyAddressDetail(resp, data));
          dispatch(updateFormStatus(true));
        } else {
          resp = [{ survey_address: "address not found" }];
        }
      })
      .catch(error => {
        dispatch(receivedSurveyAddressErrorDetail(true));
        let resp = [{ survey_address: "address not found" }];
        dispatch(receivedSurveyAddressDetail(resp, resp));
      });
  };
};

export const getCustomerDeliveryAddress = customer_id => {
  return dispatch => {
    dispatch(fetchCustomerAddressDetail());
    let url = `${Config.url}getCustomerDeliveryAddressNew`;
    axios
      .get(url, {
        params: {
          customer_id: customer_id
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
        let resp = [];
        if (
          typeof response !== "undefined" &&
          typeof response.data !== "undefined" &&
          typeof response.data.data !== "undefined" &&
          response.data.data.length > 0
        ) {
          resp = response.data.data;
          let data = [];
          resp.map((item, index) => {
            data.push(item);
          });
          dispatch(receivedCustomerAddressDetail(resp, data));
          dispatch(updateFormStatus(true));
        } else {
          resp = [{ survey_address: 'address not found' }];
        }
      })
      .catch(error => {
        dispatch(receivedSurveyAddressErrorDetail(true));
        let resp = [{ survey_address: "address not found" }];
        dispatch(receivedSurveyAddressDetail(resp, resp));
      });
  };
};

// export const setUserNearestStore = (lat, lng) => {
//   return (dispatch) => {
//     dispatch(setNearestStoreFetching(true));
//     let url = `${Config.url}getzippernearestaddress`;
//     axios.get(url, {
//       params: {
//         lat: lat,
//         long: lng
//       },
//       headers: {"token": Config.token,
//         "device-type": Config.devicetype,
//         "Accept": Config.Accept,
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//       }
//     }).then( response => {
//       if( typeof response.data !== 'undefined' && response.data.data !== 'undefined'){
//         const storeDetail = response.data.data.response;
//         saveLocalStorage('storeDetail', storeDetail.detail_address);
//         dispatch(setNearestStore(storeDetail));
//         dispatch(setNearestStoreFetching(false));
//       } else{
//         dispatch(setAlertMeassage(true, translate("Unfortunately, this address is not currently in our delivery area")));
//         dispatch(setNearestStoreFetching(false));
//         dispatch(setNearestStoreError(true));
//         dispatch(setLoaderFlag(true));
//       }
//     }).catch( error => {
//       dispatch(setAlertMeassage(true, translate("Unfortunately, this address is not currently in our delivery area")));
//       dispatch(setNearestStoreFetching(false));
//       dispatch(setNearestStoreError(true));
//       dispatch(setLoaderFlag(true));
//     });
//   };
// };

export const setUserNearestStore = (lat, lng, callback, item) => {
  return dispatch => {
    dispatch(setNearestStoreFetching(true));
    let url = `${Config.url}getzippernearestaddress`;
    axios
      .get(url, {
        params: {
          lat: lat,
          long: lng
        },
        headers: {
          token: Config.token,
          "device-type": Config.devicetype,
          Accept: Config.Accept,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      })
      .then(response => {
        if (
          typeof response.data !== "undefined" &&
          response.data.data !== "undefined"
        ) {
          const res = response.data.data.response;
          if (
            res.status === "success" &&
            typeof res.result !== "undefined" &&
            typeof res.result.trade_zone_id !== "undefined"
          ) {
            const storeDetail = res.result;
            storeDetail.latitude = lat;
            storeDetail.longitude = lng;

            if (typeof response.data.data.detail_address !== "undefined") {
              storeDetail.detail_address = response.data.data.detail_address;
            }

            saveLocalStorage("storeDetail", storeDetail);
            callback !== undefined && item !== undefined && callback(item);
            dispatch(setNearestStore(storeDetail));
            dispatch(setNearestStoreFetching(false));
          } else {
            dispatch(
              setAlertMeassage(
                true,
                translate(
                  "Unfortunately, this address is not currently in our delivery area"
                )
              )
            );
            dispatch(setNearestStoreFetching(false));
            dispatch(setNearestStoreError(true));
            dispatch(setLoaderFlag(true));
          }
        }
      })
      .catch(error => {
        dispatch(
          setAlertMeassage(
            true,
            translate(
              "Unfortunately, this address is not currently in our delivery area"
            )
          )
        );
        dispatch(setNearestStoreFetching(false));
        dispatch(setNearestStoreError(true));
        dispatch(setLoaderFlag(true));
      });
  };
};

export const setLoadingFlag = status => {
  return dispatch => {
    dispatch(setLoaderFlag(status));
  };
};

export const setCurrentLocation = values => {
  return dispatch => {
    dispatch(currentLocation(values));
  };
};

export const setFormprops = values => {
  return dispatch => {
    dispatch(formProps(values));
  };
};

export const resetFormprops = () => {
  return dispatch => {
    dispatch(resetformState());
  };
};

export const resetSurveyAddressArray = () => {
  return dispatch => {
    dispatch(resetSurveyAddress());
  };
};

export const setAddressByLatLng = (lat, lng) => {
  return dispatch => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lat +
        "," +
        lng +
        "&key=" +
        "AIzaSyDyiBm2roWPUJ7G1DNQJFnC4ttcWMdXdNQ"
    )
      .then(response => response.json())
      .then(responseJson => {
        if (
          typeof responseJson !== "undefined" &&
          typeof responseJson.results !== "undefined" &&
          typeof responseJson.results[0] !== "undefined" &&
          typeof responseJson.results[0].formatted_address !== "undefined"
        ) {
          let address = responseJson.results[0].formatted_address;
          let addressHeading =
            responseJson.results[0].address_components[0].long_name;
          let centerPoint = { lat: lat, lng: lng };
          dispatch(setCenterPoint(centerPoint));
          dispatch(setUserAddress(address, addressHeading));
        }
      });
  };
};

export const addDeliveryAddress = values => {
  return dispatch => {
    dispatch(setDeliveryAddress(true, false));
    let user = getLocalStorage("user");
    let userInfo = getLocalStorage("receivedLoginDetail");
    let storeDetail = getLocalStorage("storeDetail");
    let place = getLocalStorage("delivery_address");

    let addressData = generateGuestAddress();
    let customObj = {
      cityregion: "",
      region: "",
      postal_code: "",
      street: ""
    };

    customObj.cityregion = addressData.region;
    customObj.region = addressData.region;
    customObj.street = addressData.street;
    customObj.type = addressData.type;
    customObj.postal_code = addressData.postal_code;
    customObj.longitude = addressData.longitude;
    customObj.latitude = addressData.latitude;

    saveLocalStorage("autolocation", false);
    let url = `${Config.url}addcustomerzipprdeliveryaddress`;

    /*
     *  this api will call only in case of login user
     */
    if (
      typeof userInfo.customer_id !== "undefined" &&
      userInfo.customer_id !== ""
    ) {
      let deliveryDetail = new FormData();
      deliveryDetail.append("customer_id", userInfo.customer_id);
      deliveryDetail.append("kav", user.address.kavnumber);
      deliveryDetail.append("place", user.address.address);
      deliveryDetail.append("region", storeDetail.trade_zone_address.state);
      deliveryDetail.append("floor", user.address.floor);
      deliveryDetail.append("tower", user.address.tower);
      deliveryDetail.append(
        "postcode",
        storeDetail.trade_zone_address.postal_code
      );
      deliveryDetail.append("substreet", user.address.substreet);
      deliveryDetail.append("type", user.address.type);
      deliveryDetail.append("street", place.place);
      deliveryDetail.append("cityregion", storeDetail.trade_zone_address.city);
      deliveryDetail.append("longitude", storeDetail.longitude);
      deliveryDetail.append("latitude", storeDetail.latitude);
      
      axios({
        method: "post",
        url: url,
        timeout: 100000,
        data: deliveryDetail,
        headers: {
          token: Config.token,
          "device-type": Config.devicetype,
          Accept: Config.Accept,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          dispatch(setCustomerAddress());
          

          saveLocalStorage("delivery_address", response.data.data);
          saveLocalStorage("entity_id",response.data.data.entity_id)
          /*
           *  Set of rules that define how user will land on menu or cart page.
           *  if user coming from cart page and cart is empty then user will land on menu page.
           *  if user coming from cart page and cart having some item then user will land on cart page.
           *  if user coming from home page and cart is empty then user will land on menu page.
           *  if user coming from home page and cart having some value then user will land on menu page.
           */
          let cart = getLocalStorage("cartItems");

          let confirmOrderAtViewCart = getLocalStorage(
            "confirmOrderAtViewCart"
          );

          if (confirmOrderAtViewCart === true && cart.id !== undefined) {
            browserHistory.push(Url.VIEW_CART);
          } else if (confirmOrderAtViewCart === true && cart.id === undefined) {
             browserHistory.push(Url.MENU_PAGE);
          } else {
             browserHistory.push(Url.MENU_PAGE);
          }
        })
        .catch(error => {
          dispatch(
            setAlertMeassage(
              true,
              translate(
                "Invalid address, delivery store not found. please type address"
              )
            )
          );
          dispatch(setDeliveryAddress(false, true));
        });
    }
  };
};

export const actions = {
  fetchSurveyAddress,
  setFormprops,
  setCurrentLocation,
  setUserAddress,
  addDeliveryAddress,
  setGeoUserAddress,
  setGeoCenterPoint
};

export const resetAlertBox = (showAlert, message) => {
  return dispatch => {
    dispatch(setAlertMeassage(showAlert, message));
    dispatch(resetIsSelectValueProp(false));
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCHING_SURVEY_ADDRESS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [FETCHING_CUSTOMER_ADDRESS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      showLoader: action.showLoader
    };
  },
  [RECEIVED_SURVEY_DATA]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      surveyAddress: action.surveyAddress,
      deliveryAddress: action.deliveryAddress
    };
  },
  [SET_CUSTOMER_ADDRESS]: (state, action) => {
    return {
      ...state,
      showLoader: action.showLoader
    };
  },

  [RECEIVED_CUSTOMER_ADDRESS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      customerAddress: action.customerAddress,
      error: action.error,
      showLoader: action.showLoader
    };
  },
  [UPDATE_FORM_STATUS]: (state, action) => {
    return {
      ...state,
      showDeliveryForm: action.showDeliveryForm
    };
  },
  [SET_FORM_STATE]: (state, action) => {
    return {
      ...state,
      isSelectValue: action.isSelectValue,
      selectedValue: action.selectedValue
    };
  },
  [SET_CURRENT_LOCATION]: (state, action) => {
    return {
      ...state,
      currentLocation: action.currentLocation
    };
  },
  [SET_USER_ADDRESS]: (state, action) => {
    return {
      ...state,
      userAddress: action.userAddress,
      userAddressHeading: action.userAddressHeading
    };
  },
  [ADDRESS_SURVEY_ERROR]: receivedSurveyAddressErrorDetail,
  [RESET_FORM_STATE]: (state, action) => {
    return {
      ...state,
      isSelectValue: action.isSelectValue,
      selectedValue: action.selectedValue,
      storeDetail: action.storeDetail,
      fetchDeliveryAddress: action.fetchDeliveryAddress
    };
  },
  [RESET_SURVEY_ADDRESS]: (state, action) => {
    return {
      ...state,
      surveyAddress: action.surveyAddress
    };
  },
  [SET_DELIVERY_ADDRESS]: (state, action) => {
    return {
      ...state,
      fetchDeliveryAddress: action.fetchDeliveryAddress,
      error: action.error,
      showLoader: action.showLoader
    };
  },
  [SET_USER_CENTER_POINT]: (state, action) => {
    return {
      ...state,
      centerPoint: action.centerPoint
    };
  },
  [RECEIVED_NEAREST_STORE]: (state, action) => {
    return {
      ...state,
      storeDetail: action.storeDetail
    };
  },
  [FETCHING_NEAREST_STORE]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [ERROR_NEAREST_STORE]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [SET_LOADER_FLAG]: (state, action) => {
    return {
      ...state,
      loaderFlag: action.loaderFlag
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  },
  [RESET_IS_SELECT_VALUE]: (state, action) => {
    return {
      ...state,
      isSelectValue: action.isSelectValue,
      storeDetail: action.storeDetail
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  surveyAddress: [],
  deliveryAddress: [],
  error: false,
  showDeliveryForm: false,
  isSelectValue: false,
  selectedValue: "",
  currentLocation: {},
  userAddress: "",
  centerPoint: { lat: -6.966678, lng: 107.637846 }, //{lat: -6.174355, lng: 106.876404},
  storeDetail: {},
  loaderFlag: false,
  showAlert: false,
  alertMessage: "",
  userAddressHeading: "",
  lat: 0.0,
  lng: 0.0,
  fetchDeliveryAddress: false,
  customerAddress: [],
  showLoader: true
};

export default function customerDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
