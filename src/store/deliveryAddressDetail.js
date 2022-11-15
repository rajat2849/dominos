import axios from "axios";
import { Config } from "config/Config";
import { translate } from "components/Helpers";

// ------------------------------------
// Constants
// ------------------------------------

export const SET_STORE_LIST = "SET_STORE_LIST";

// ------------------------------------
// Actions
// ------------------------------------

export function setStoreList(stores) {
  return {
    type: SET_STORE_LIST,
    storeList: stores
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
        // console.log('nearest store appi response  ================', response);
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
  

  





  
  [SET_STORE_LIST]: (state, action) => {
    return {
      ...state,
      storeList: action.storeList
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
  storeList: []
};

export default function findStoreReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
