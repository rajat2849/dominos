import axios from "axios";
import { Config } from "config/Config";
import { translate } from "components/Helpers";
import { saveLocalStorage } from "components/Helpers";
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_NEAREST_STORE = "FETCH_NEAREST_STORE";
export const RECEIVED_NEAREST_STORE = "RECEIVED_NEAREST_STORE";
export const ERROR_NEAREST_STORE = "ERROR_NEAREST_STORE";
export const SET_CENTER_POINT = "SET_CENTER_POINT";
export const SET_MARKERS = "SET_MARKERS";
export const SET_USER_CURRENT_AREA = "SET_USER_CURRENT_AREA";
export const SET_STORE_LOCATION = "SET_STORE_LOCATION";
export const SET_STORE_LOCATION_FETCHING = "SET_STORE_LOCATION_FETCHING";
export const ERROR_STORE_LOCATION = "ERROR_STORE_LOCATION";
export const SET_STORE_DETAIL = "SET_STORE_DETAIL";
export const SET_USER_LOCATION_FETCHING = "SET_USER_LOCATION_FETCHING";
export const RESET_STORE_DATA = "RESET_STORE_DATA";
export const SET_LOADER_FLAG = "SET_LOADER_FLAG";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const SET_NEAREST_MARKER = "SET_NEAREST_MARKER";
export const SET_STORE_LIST = "SET_STORE_LIST";
export const SET_DELIVERY_ADDRESS = "SET_DELIVERY_ADDRESS";
export const SET_CARRYOUT_ADDRESS = "SET_CARRYOUT_ADDRESS";

// ------------------------------------
// Actions
// ------------------------------------

export function fetchNearestStore(status) {
  return {
    type: FETCH_NEAREST_STORE,
    fetching: status,
    fetchStore:true
  };
}

export function resetStoreLocationsState() {
  return {
    type: RESET_STORE_DATA,
    storeDetail: [],
    storeLocations: [],
    userCurrentAreaId: "",
    markers: [],
    centerPoint: ""
  };
}

export function setUserLocationFetching(status) {
  return {
    type: SET_USER_LOCATION_FETCHING,
    fetching: status
  };
}

export function receivedNearestStore(payload) {
  return {
    type: RECEIVED_NEAREST_STORE,
    nearesrStores: payload
  };
}

export function errorNearestStore(status) {
  return {
    type: ERROR_NEAREST_STORE,
    error: status
  };
}

export function setCenterPoint(centerPoint) {
  return {
    type: SET_CENTER_POINT,
    centerPoint: centerPoint
  };
}

export function setStoreLocationFetching(status) {
  return {
    type: SET_STORE_LOCATION_FETCHING,
    fetching: status
  };
}

export function setMarkers(data) {
  return {
    type: SET_MARKERS,
    markers: data
  };
}

export function setUserCurrentArea(areaId) {
  return {
    type: SET_USER_CURRENT_AREA,
    userCurrentAreaId: areaId
  };
}

export function setStoreLocations(data) {
  return {
    type: SET_STORE_LOCATION,
    storeLocations: data,
    getLocation:true
  };
}

export function setStoreDetail(storeDetail) {
  return {
    type: SET_STORE_DETAIL,
    storeDetail: storeDetail
  };
}

export function errorStoreLocations(status) {
  return {
    type: ERROR_STORE_LOCATION,
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

export function setNearestMarker(data) {
  return {
    type: SET_NEAREST_MARKER,
    nearestMarker: data
  };
}

export function setStoreList(stores) {
  return {
    type: SET_STORE_LIST,
    storeList: stores
  }
}

export function setDeliveryAddress(address_details, isActive) {
  return {
    type: SET_DELIVERY_ADDRESS,
    deliveryAddress: address_details,
    activeBtn: isActive,
  }
}

export function setCarryoutAddress(address_details, isActive) {
  return {
    type: SET_CARRYOUT_ADDRESS,
    takeawayAddress: address_details,
    activeBtn: isActive,
  }
}

// ------------------------------------
// Actions Creater
// ------------------------------------
export const findStore = (lat, lng, areaId, page) => {
  return dispatch => {
    let centerLocation = { lat: lat, lng: lng };
    if (areaId !== "undefined") {
      dispatch(fetchNearestStore(true));
      let url = `${Config.url}getStore`;
      axios
        .get(url, {
          params: {
            area_id: areaId
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
          let nearesrStores = {};
          let data = [];
          if (
            typeof response.data.data !== "undefined" &&
            !_.isEmpty(response.data.data)
          ) {
            nearesrStores = response.data.data;
            nearesrStores.map((item, index) => {
              let operations =
                typeof item.operations !== "undefined" ? item.operations : [];
              let isSameExectionTime = true;
              if (item.operations.length > 0) {
                let firstStoreOpTime = 0;
                item.operations.map((opDetail, index) => {
                  firstStoreOpTime =
                    index === 0 ? opDetail.schedule : firstStoreOpTime;
                  if (
                    index > 0 &&
                    firstStoreOpTime === opDetail.schedule &&
                    isSameExectionTime
                  ) {
                    isSameExectionTime = firstStoreOpTime;
                  }
                });
              }
              // if store open 7 day and timing is same for all day then show single line on app
              if (item.operations.length === 7 && isSameExectionTime) {
                operations.splice(1);
                operations[0]["day"] = "Mon-Sun";
              }

              data.push({
                Latitude: parseFloat(item.store_location_lat),
                Longitude: parseFloat(item.store_location_long),
                StoreCode: item.store_mapping_code,
                StoreName: item.store_title_en,
                AddressLine1: item.store_address_en,
                Zipcode: item.store_zipcode,
                Kabupaten: item.Kabupaten,
                Phone: item.store_phone,
                Image: item.store_review_image,
                operationTime: operations,
              });
            });
          } else {
            dispatch(setAlertMeassage(true, translate("Address not found")));
          }

          dispatch(setMarkers(data));
          dispatch(receivedNearestStore(data));
          dispatch(fetchNearestStore(false));
        })
        .catch(error => {
          if (page === "delivery") {
            dispatch(setAlertMeassage(true, translate("Address not found")));
          } else if(page==='carryout') {
            dispatch(
              setAlertMeassage(true, translate('Turn On Location Services to Allow Maps to Determine Your Location Go to >Setting>Location>"Turn On Your Location"'))
            );
          }
          dispatch(errorNearestStore(error));
          dispatch(fetchNearestStore(false));
        });
    } else {
      if (page === "delivery") {
        dispatch(setAlertMeassage(true, translate("Address not found")));
      } else if(page === "carryout"){
        dispatch(fetchNearestStore(false));
        dispatch(
          setAlertMeassage(true, translate('Turn On Location Services to Allow Maps to Determine Your Location Go to >Setting>Location>"Turn On Your Location"'))
        );
      }
    }
    dispatch(setCenterPoint(centerLocation));
  };
};

export const validateUserCurrentAddress = (lat, lng, areaData) => {
  return dispatch => {
    let currentArea = "";
    let areaId = "";
    dispatch(setUserLocationFetching(true));
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lat +
        "," +
        lng +
        "&key=" +
        "AIzaSyCEO139WyJJWm4Gyy4SQnl5kxLURN-zcHs"
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "OK") {
          responseJson.results[0].address_components.map(function(item, index) {
            if (item.types[0] == "administrative_area_level_2") {
              currentArea = item.long_name.toLowerCase();
              if (typeof areaData !== "undefined") {
                areaData.map(function(item, index) {
                  let areaName = item.name.toLowerCase();
                  if (currentArea.search(areaName) != -1) {
                    areaId = item.id;
                  }
                });
                if (areaId !== "") {
                  dispatch(setUserCurrentArea(areaId));
                } else {
                  dispatch(setUserCurrentArea("undefined"));
                }
              }
            }
          });
        } else {
          dispatch(setUserCurrentArea("undefined"));
        }
        dispatch(setUserLocationFetching(false));
      });
  };
};

export const getStoreLocation = () => {
  return dispatch => {
    dispatch(setStoreLocationFetching(true));
    const url = `${Config.url}getArea`;
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
        let storeLocations = [];
        const storeData = [];
        let storeDetails = [];
        if (
          typeof response.data.data !== "undefined" &&
          !_.isEmpty(response.data.data)
        ) {
          storeLocations = response.data.data;
          storeLocations.map((item, index) => {
            let storeDetail = { id: item.id, name: item.area_name_en };
            storeDetails.push(storeDetail);
            storeData.push(storeDetail);
          });
          dispatch(setStoreDetail(storeDetails));
          dispatch(setStoreLocations(storeData));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(
          setAlertMeassage(true, translate("No available store nearest to you"))
        );
        dispatch(errorStoreLocations(error));
      });
    dispatch(setStoreLocationFetching(false));
  };
};

export const resetStoreLocations = () => {
  return dispatch => {
    dispatch(resetStoreLocationsState());
  };
};

export const getUserNearestStore = (lat, lng) => {
  return dispatch => {
    let centerLocation = { lat: lat, lng: lng };
    dispatch(setCenterPoint(centerLocation));
    dispatch(fetchNearestStore(true));
    var url = `${Config.url}getNearestStore`;
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
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        
        let resp = [];
        let nearestMarker = {};
        if (
          typeof response.data !== "undefined" &&
          response.data.data !== "undefined" &&
          response.data.data.length > 0
        ) {
          const storeDetail = response.data.data[0];
          let operations = [];
          operations[0] = [];
          operations[0]["day"] = "Mon-Sun";
          const dayCode = new Date().getDay();
          operations[0]["schedule"] =
            storeDetail.operations[dayCode-1].schedule.split("-")[0] +
            "-" +
            storeDetail.operations[dayCode-1].schedule.split("-")[1];
          resp = [
            {
              StoreName: storeDetail.StoreName,
              StoreNo: storeDetail.StoreNo,
              AddressLine1: storeDetail.AddressLine1,
              AddressLine2: storeDetail.AddressLine2,
              Kabupaten: storeDetail.Kabupaten,
              Postcode: storeDetail.Postcode,
              Distance: storeDetail.Distance,
              DistanceUnits: storeDetail.DistanceUnits,
              Latitude: storeDetail.Latitude,
              Longitude: storeDetail.Longitude,
              Phone: storeDetail.phone,
              operationTime: operations,
              // make keys similar with other api response
              StoreCode: storeDetail.StoreNo,
              latitude: storeDetail.Latitude,
              longitude: storeDetail.Longitude,
              areaId : storeDetail.AreaId
            }
          ];

          nearestMarker = {
            StoreName: storeDetail.StoreName,
            StoreNo: storeDetail.StoreNo,
            AddressLine1: storeDetail.AddressLine1,
            AddressLine2: storeDetail.AddressLine2,
            Kabupaten: storeDetail.Kabupaten,
            Postcode: storeDetail.Postcode,
            Distance: storeDetail.Distance,
            DistanceUnits: storeDetail.DistanceUnits,
            Latitude: storeDetail.Latitude,
            Longitude: storeDetail.Longitude,
            Phone: storeDetail.phone,
            operationTime: operations,
            // make keys similar with other api response
            StoreCode: storeDetail.StoreNo,
            latitude: storeDetail.Latitude,
            longitude: storeDetail.Longitude,
            areaId : storeDetail.AreaId
          };
          //dispatch(findStore(storeDetail.Latitude,storeDetail.Longitude, storeDetail.AreaId, "carryout"))
          dispatch(setMarkers(resp));
          dispatch(receivedNearestStore(resp));
          dispatch(fetchNearestStore(false));
          dispatch(setLoaderFlag(true));
          dispatch(setNearestMarker(nearestMarker));
          dispatch(setStoreList(response.data.data));
        } else {
          dispatch(
            setAlertMeassage(true, translate('Turn On Location Services to Allow Maps to Determine Your Location Go to >Setting>Location>"Turn On Your Location"'))
          );
          dispatch(fetchNearestStore(false));
          dispatch(errorNearestStore(true));
          dispatch(setLoaderFlag(true));
        }
      })
      .catch(error => {
        dispatch(
          setAlertMeassage(true, translate('Turn On Location Services to Allow Maps to Determine Your Location Go to >Setting>Location>"Turn On Your Location"'))
        );
        dispatch(fetchNearestStore(false));
        dispatch(errorNearestStore(true));
        dispatch(setLoaderFlag(true));
      });
  };
};

export const setAddressDetails = (address_details, isActive) => {
  return dispatch => {
    saveLocalStorage("store", address_details);
    saveLocalStorage("deliveryAddress", address_details);
    saveLocalStorage("delivery_address", address_details);
    saveLocalStorage("takeawayDetail",address_details);
    if (isActive === 'delivery') {
      dispatch(setDeliveryAddress(address_details, isActive));
      saveLocalStorage("active_Btn", isActive);
    } else {
      dispatch(setCarryoutAddress(address_details, isActive));
    }
  };
};

export const resetAlertBox = (showAlert, message) => {
  return dispatch => {
    dispatch(setAlertMeassage(showAlert, message));
  };
};

export const resetNearestMarker = () => {
  return dispatch => {
    dispatch(setNearestMarker([]));
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_NEAREST_STORE]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      fetchStore : action.fetchStore
    };
  },

  [RECEIVED_NEAREST_STORE]: (state, action) => {
    return {
      ...state,
      nearesrStores: action.nearesrStores
    };
  },

  [SET_CENTER_POINT]: (state, action) => {
    return {
      ...state,
      centerPoint: action.centerPoint
    };
  },

  [SET_MARKERS]: (state, action) => {
    return {
      ...state,
      markers: action.markers
    };
  },

  [SET_USER_CURRENT_AREA]: (state, action) => {
    return {
      ...state,
      userCurrentAreaId: action.userCurrentAreaId
    };
  },

  [SET_STORE_LOCATION]: (state, action) => {
    return {
      ...state,
      storeLocations: action.storeLocations,
      getLocation : action.getLocation
    };
  },

  [SET_STORE_DETAIL]: (state, action) => {
    return {
      ...state,
      storeDetail: action.storeDetail
    };
  },

  [ERROR_STORE_LOCATION]: errorStoreLocations,

  [SET_USER_LOCATION_FETCHING]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },

  [RESET_STORE_DATA]: (state, action) => {
    return {
      ...state,
      storeDetail: action.storeDetail,
      storeLocations: action.storeDetail,
      userCurrentAreaId: action.userCurrentAreaId,
      markers: action.markers
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
  [SET_NEAREST_MARKER]: (state, action) => {
    return {
      ...state,
      nearestMarker: action.nearestMarker
    };
  },
  [SET_STORE_LIST]: (state, action) => {
    return {
      ...state,
      storeList: action.storeList
    };
  },
  [SET_DELIVERY_ADDRESS]: (state, action) => {
    return {
      ...state,
      deliveryAddress: action.deliveryAddress,
      activeBtn: action.activeBtn
    };
  },
  [SET_CARRYOUT_ADDRESS]: (state, action) => {
    return {
      ...state,
      takeawayAddress: action.takeawayAddress,
      activeBtn: action.activeBtn
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  markers: [],
  centerPoint: { lat: -6.174355, lng: 106.876404 },
  error: false,
  fetching: false,
  nearesrStores: [],
  userCurrentAreaId: "",
  storeLocations: [],
  storeDetail: [],
  loaderFlag: false,
  showAlert: false,
  alertMessage: "",
  nearestMarker: {},
  getLocation:false,
  fetchStore:false,
  storeList: [],
  deliveryAddress: {},
  takeawayAddress: {},
  activeBtn: ''
};

export default function findStoreReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
