import axios from "axios";

import { Config, WeekDay } from "../../../config/Config";
import { saveLocalStorage } from "components/Helpers";
import { modifyValueDealsList } from "DashboardSubComponent/ModifyListComponent";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_PROMOTION_LIST = "FETCHING_PROMOTION_LIST";
export const RECEIVED_PROMOTION_LIST = "RECEIVED_PROMOTION_LIST";
export const PROMOTION_LIST_ERROR = "PROMOTION_LIST_ERROR";
export const FETCHING_VALUE_DEALS = "FETCHING_VALUE_DEALS";
export const RECEIVED_VALUE_DEALS = "RECEIVED_VALUE_DEALS";
export const ERROR_VALUE_DEALS = "ERROR_VALUE_DEALS";
export const FETCHING_PIZZA_LIST = "FETCHING_PIZZA_LIST";
export const RECEIVED_PIZZA_LIST = "RECEIVED_PIZZA_LIST";
export const ERROR_PIZZA_LIST = "ERROR_PIZZA_LIST";
export const FETCHING_SIDESDESSERTS_LIST = "FETCHING_SIDESDESSERTS_LIST";
export const RECEIVED_SIDESDESSERTS_LIST = "RECEIVED_SIDESDESSERTS_LIST";
export const ERROR_SIDESDESSERTS_LIST = "ERROR_SIDESDESSERTS_LIST";
export const FETCHING_BEVERAGE_LIST = "FETCHING_BEVERAGE_LIST";
export const RECEIVED_BEVERAGE_LIST = "RECEIVED_BEVERAGE_LIST";
export const ERROR_BEVERAGE_LIST = "ERROR_BEVERAGE_LIST";
export const GET_CURRENT_DAY = "GET_CURRENT_DAY";
export const FETCHING_DETAIL_PROMOTION = "FETCHING_DETAIL_PROMOTION";
export const RECEIVED_DETAIL_PROMOTION = "RECEIVED_DETAIL_PROMOTION";
export const ERROR_DETAIL_PROMOTION = "ERROR_DETAIL_PROMOTION";
export const FETCHING_DETAIL_VALUE_DEALS = "FETCHING_DETAIL_VALUE_DEALS";
export const RECEIVED_DETAIL_VALUE_DEALS = "RECEIVED_DETAIL_VALUE_DEALS";
export const ERROR_DETAIL_VALUE_DEALS = "ERROR_DETAIL_VALUE_DEALS";
export const ADD_ORDER = "ADD_ORDER";
export const GET_CONFIG = "GET_CONFIG";
export const SET_CONFIG = "SET_CONFIG";
//export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

// ------------------------------------
// Actions
// ------------------------------------

// export function addProductToCart(cartProducts) {
//   return {
//     type : ADD_PRODUCT_TO_CART,
//     cartProducts : cartProducts
//   }
// }

export function addItemFromMenu(selectedProducts) {
  return {
    type: ADD_ORDER,
    selectedProducts: selectedProducts
  };
}

export function fetchingPromotionList() {
  return {
    type: FETCHING_PROMOTION_LIST,
    fetching: true
  };
}

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

export function receivedPromotionList(promotionList) {
  return {
    type: RECEIVED_PROMOTION_LIST,
    fetching: false,
    promotionList: promotionList,
    isPromotionFetched: true,
    error: false
  };
}

export function promotionListError(status) {
  return {
    type: PROMOTION_LIST_ERROR,
    fetching: false,
    isPromotionFetched: false,
    error: status
  };
}

export function fetchingValueDealsList() {
  return {
    type: FETCHING_VALUE_DEALS,
    fetching: true
  };
}

export function receivedValueDealsList(valueDealsList) {
  return {
    type: RECEIVED_VALUE_DEALS,
    fetching: false,
    valueDealsList: valueDealsList,
    isValueDealsFetched: true,
    error: false
  };
}

export function errorValueDealsList(status) {
  return {
    type: ERROR_VALUE_DEALS,
    fetching: false,
    isValueDealsFetched: false,
    error: status
  };
}

export function fetchingPizzaList() {
  return {
    type: FETCHING_PIZZA_LIST,
    fetching: true
  };
}

export function receivedPizzaList(pizzaList) {
  return {
    type: RECEIVED_PIZZA_LIST,
    fetching: false,
    pizzaList: pizzaList,
    isPizzaFetched: true,
    error: false
  };
}

export function errorPizzaList(status) {
  return {
    type: ERROR_PIZZA_LIST,
    fetching: false,
    isPizzaFetched: false,
    error: status
  };
}

export function fetchingSidesDessertsList() {
  return {
    type: FETCHING_SIDESDESSERTS_LIST,
    fetching: true
  };
}

export function receivedSidesDessertList(sidesDessertList) {
  return {
    type: RECEIVED_SIDESDESSERTS_LIST,
    fetching: false,
    sidesDessertList: sidesDessertList,
    isSideDessertFetched: true,
    error: false
  };
}

export function errorSidesDessertsList(status) {
  return {
    type: ERROR_SIDESDESSERTS_LIST,
    fetching: false,
    isSideDessertFetched: false,
    error: status
  };
}

export function fetchingBeverageList() {
  return {
    type: FETCHING_BEVERAGE_LIST,
    fetching: true
  };
}

export function receivedBeverageList(beverageList) {
  return {
    type: RECEIVED_BEVERAGE_LIST,
    fetching: false,
    beverageList: beverageList,
    isBeverageFetched: true,
    error: false
  };
}

export function errorBeverageList(status) {
  return {
    type: ERROR_BEVERAGE_LIST,
    fetching: false,
    isBeverageFetched: false,
    error: status
  };
}

export function fetchingDetailPromotion() {
  return {
    type: FETCHING_DETAIL_PROMOTION,
    fetching: true
  };
}

export function receivedDetailPromotion(promotionDetail) {
  return {
    type: RECEIVED_DETAIL_PROMOTION,
    fetching: false,
    promotionDetail: promotionDetail,
    error: false
  };
}

export function errorDetailPromotion(status) {
  return {
    type: ERROR_DETAIL_PROMOTION,
    fetching: false,
    error: status
  };
}

export function fetchingDetailValueDeals() {
  return {
    type: FETCHING_DETAIL_VALUE_DEALS,
    fetching: true
  };
}

export function receivedDetailValueDeals(valueDetail) {
  return {
    type: RECEIVED_DETAIL_VALUE_DEALS,
    fetching: false,
    valueDetail: valueDetail,
    error: false
  };
}

export function errorDetailValueDeals(status) {
  return {
    type: ERROR_DETAIL_VALUE_DEALS,
    fetching: false,
    error: status
  };
}

export function getDay(day) {
  return {
    type: GET_CURRENT_DAY,
    currentDay: day
  };
}

// ------------------------------------
// Action creators
// ------------------------------------
export const getPromotionList = () => {
  return dispatch => {
    dispatch(fetchingPromotionList());
    let url = `${Config.url}getnewlistpromotions`;
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
        let promotionList = [];
        const categoryName = response.data.categoryname;
        if (response.data.data.length > 0) {
          promotionList = response.data.data;
          promotionList.sort(function(a, b) {
            // var dateA = new Date(a.sort),
            //   dateB = new Date(b.sort);
               var dateA = (a.sort),
              dateB = (b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("promotionList",{categoryName , data :promotionList} );
        }
        dispatch(receivedPromotionList({categoryName , data :promotionList}));
      })
      .catch(error => {
        dispatch(promotionListError(true));
      });
  };
};

export const getValueDealsList = () => {
  return dispatch => {
    dispatch(fetchingValueDealsList());
    let url = `${Config.url}getlistvaluedeals`;
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
        let valueDealsList = [];
        const categoryName = response.data.categoryname;
        if (response.data.data.length > 0) {
          valueDealsList = response.data.data;
          const modifyValueDeals = modifyValueDealsList(valueDealsList);
          modifyValueDeals.sort(function(a, b) {
            var dateA = new Date(a.sort),
              dateB = new Date(b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("valueDealsList",{categoryName , data : modifyValueDeals});
          dispatch(receivedValueDealsList({categoryName , data : modifyValueDeals}));
        }
      })
      .catch(error => {
        dispatch(errorValueDealsList(true));
      });
  };
};

export const fetchConfig = () => {
  return dispatch => {
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
      })
      .catch(error => {
    
      });
  };
};


export const getPizzaList = () => {
  return dispatch => {
    dispatch(fetchingPizzaList());
    let url = `${Config.url}getnewlistpizza`;
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
        let pizzaList = [];
        if (response.data.data.length > 0) {
          pizzaList = response.data.data;
          saveLocalStorage("pizzaList", pizzaList);
        }
        dispatch(receivedPizzaList(pizzaList));
      })
      .catch(error => {
        dispatch(errorPizzaList(true));
      });
  };
};

export const getSidesDessertsList = () => {
  return dispatch => {
    dispatch(fetchingSidesDessertsList());
    let url = `${Config.url}getlistsideanddesserts`;
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
        let sidesDessertList = [];
        let sortedSides = [];
        if (response.data.data.length > 0) {
          sidesDessertList = response.data.data;
          //sort ides item based on category - Breads, Sides, Chicken, Rice, Pasta, Desserts, Sauce
          const sortingCategorySequence = [
            "22",
            "12",
            "11",
            "19",
            "20",
            "13",
            "21"
          ];
          sidesDessertList.map(sideItem => {
            if (typeof sideItem.category_id !== "undefined") {
              let sortingIndex = sortingCategorySequence.indexOf(
                sideItem.category_id
              );
              if (sortingIndex > -1) {
                sortedSides[sortingIndex] = sideItem;
              }
            }
          });
        }
        saveLocalStorage("sidesDessert", sortedSides);
        dispatch(receivedSidesDessertList(sortedSides));
      })
      .catch(error => {
        dispatch(errorSidesDessertsList(true));
      });
  };
};

export const getBeverageList = () => {
  return dispatch => {
    dispatch(fetchingBeverageList());
    let url = `${Config.url}getlistbeverages`;
    axios
      .get(url, {
        params: {
          grouping: true
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
        let beverageList = [];
        if (response.data.data.length > 0) {
          beverageList = response.data.data;
        }
        saveLocalStorage("beverage", beverageList);
        dispatch(receivedBeverageList(beverageList));
      })
      .catch(error => {
        dispatch(errorBeverageList(true));
      });
  };
};

export const addToCart = products => {
  return dispatch => {
    dispatch(addProductToCart(products));
  };
};

export const getCurrentDay = () => {
  return dispatch => {
    let date = new Date();
    let day = date.getDay();
    day = WeekDay[day];
    dispatch(getDay(day));
  };
};

export const actions = {
  getPromotionList,
  getValueDealsList,
  getPizzaList,
  getSidesDessertsList,
  getBeverageList,
  getCurrentDay
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCHING_PROMOTION_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_PROMOTION_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      promotionList: action.promotionList,
      isPromotionFetched: action.isPromotionFetched
    };
  },
  [FETCHING_VALUE_DEALS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_VALUE_DEALS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      valueDealsList: action.valueDealsList,
      isValueDealsFetched: action.isValueDealsFetched
    };
  },
  [FETCHING_PIZZA_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_PIZZA_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      pizzaList: action.pizzaList,
      isPizzaFetched: action.isPizzaFetched
    };
  },
  [FETCHING_SIDESDESSERTS_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_SIDESDESSERTS_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      sidesDessertList: action.sidesDessertList,
      isSideDessertFetched: action.isSideDessertFetched
    };
  },
  [FETCHING_BEVERAGE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_BEVERAGE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      beverageList: action.beverageList,
      isBeverageFetched: action.isBeverageFetched
    };
  },
  [GET_CURRENT_DAY]: (state, action) => {
    return {
      ...state,
      currentDay: action.currentDay
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

  [ADD_ORDER]: (state, action) => {
    return {
      ...state,
      selectedProducts: action.selectedProducts
    };
  },
  // [ADD_PRODUCT_TO_CART] : (state, action) => {
  //   return {
  //     ...state,
  //     cartProducts : action.cartProducts
  //   }
  // },

  [PROMOTION_LIST_ERROR]: promotionListError,
  [ERROR_VALUE_DEALS]: errorValueDealsList,
  [ERROR_PIZZA_LIST]: errorPizzaList,
  [ERROR_SIDESDESSERTS_LIST]: errorSidesDessertsList,
  [ERROR_BEVERAGE_LIST]: errorBeverageList
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  error: false,
  promotionList: [],
  valueDealsList: [],
  pizzaList: [],
  sidesDessertList: [],
  beverageList: [],
  isPromotionFetched: false,
  isValueDealsFetched: false,
  isPizzaFetched: false,
  isSideDessertFetched: false,
  isBeverageFetched: false,
  currentDay: "",
  selectedProducts: [],
  config:{},
  configuration:{}
  // cartProducts : [],
};

export default function menuReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
