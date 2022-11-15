import axios from "axios";

import { Config, WeekDay } from "../../../config/Config";
import { saveLocalStorage, modifyList } from "components/Helpers";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_PROMOTION_LIST = "FETCHING_PROMOTION_LIST";
export const RECEIVED_PROMOTION_LIST = "RECEIVED_PROMOTION_LIST";
export const PROMOTION_LIST_ERROR = "PROMOTION_LIST_ERROR";
export const FETCHING_BESTSELLER_LIST = "FETCHING_BESTSELLER_LIST";
export const RECEIVED_BESTSELLER_LIST = "RECEIVED_BESTSELLER_LIST";
export const BESTSELLER_LIST_ERROR = "BESTSELLER_LIST_ERROR";
export const FETCHING_BESTSELLER_PIZZA_LIST = "FETCHING_BESTSELLER_LIST";
export const RECEIVED_BESTSELLER_PIZZA_LIST = "RECEIVED_BESTSELLER_LIST";
export const PIZZA_LIST_ERROR = "BESTSELLER_LIST_ERROR";
export const FETCHING_VALUE_DEALS = "FETCHING_VALUE_DEALS";
export const RECEIVED_VALUE_DEALS = "RECEIVED_VALUE_DEALS";
export const ERROR_VALUE_DEALS = "ERROR_VALUE_DEALS";
export const FETCHING_BANNER_LIST = "FETCHING_BANNER_LIST";
export const RECEIVED_BANNER_LIST = "RECEIVED_BANNER_LIST";
export const BANNER_LIST_ERROR = "BANNER_LIST_ERROR";
export const PRODUCT_CATEGORY_COMP_STATUS = "PRODUCT_CATEGORY_COMP_STATUS";
export const SHOW_SPLASH_SCREEN = "SHOW_SPLASH_SCREEN";
export const GET_CHATBOT_STATUS = "GET_CHATBOT_STATUS";

export const GET_CUSTOMER_ORDERS = "GET_CUSTOMER_ORDERS";
export const GET_CONFIG = "GET_CONFIG";
export const SET_CONFIG = "SET_CONFIG";
export const FETCHING_APP_EXCLUSIVE_LIST = "FETCHING_APP_EXCLUSIVE_LIST";
export const RECEIVED_EXCLUSIVE_LIST = "RECEIVED_EXCLUSIVE_LIST";
export const APP_EXCLUSIVE_LIST_ERROR = "APP_EXCLUSIVE_LIST_ERROR";

export const FETCHING_VOUCHER_EXCLUSIVE_LIST = "FETCHING_VOUCHER_EXCLUSIVE_LIST";
export const RECEIVED_VOUCHER_EXCLUSIVE_LIST = "RECEIVED_VOUCHER_EXCLUSIVE_LIST";
export const VOUCHER_EXCLUSIVE_LIST_ERROR = "VOUCHER_EXCLUSIVE_LIST_ERROR";


// ------------------------------------
// Actions
// ------------------------------------
export function fetchingPromotionList() {
  return {
    type: FETCHING_PROMOTION_LIST,
    fetching: true
  };
}

export function fetchingBestSellerList() {
  return {
    type: FETCHING_BESTSELLER_LIST,
    fetching: true
  };
}

export function getConfig(data) {
  return {
    type: GET_CONFIG,
    config: data
  };
}

export function getChatbotData(chatBotData) {
  return {
    type: GET_CHATBOT_STATUS,
    chatBotData: chatBotData
  };
}
export function getCustomerOrderStatus(data) {
  return {
    type: GET_CUSTOMER_ORDERS,
    ordersCount: data
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
export function receivedBestSellerList(sellerList) {
  return {
    type: RECEIVED_BESTSELLER_LIST,
    fetching: false,
    sellerList: sellerList,
    isSellerFetched: true,
    error: false
  };
}

export function sellerListError(status) {
  return {
    type: BESTSELLER_LIST_ERROR,
    fetching: false,
    isSellerFetched: false,
    error: status
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

export function fetchingBannerList() {
  return {
    type: FETCHING_BANNER_LIST,
    fetching: true
  };
}

export function receivedBannerList(bannerList) {
  return {
    type: RECEIVED_BANNER_LIST,
    fetching: false,
    bannerList: bannerList,
    isBannerFetched: true,
    error: false
  };
}

export function bannerListError(status) {
  return {
    type: BANNER_LIST_ERROR,
    fetching: false,
    isPromotionFetched: false,
    error: status
  };
}

export function setProductCategoryCompStatus(status) {
  return {
    type: PRODUCT_CATEGORY_COMP_STATUS,
    showProductCategoryComp: status
  };
}

export function showSplashScreen(status) {
  return {
    type: SHOW_SPLASH_SCREEN,
    showSplash: status
  };
}

export function fetchingAppExclusiveList(status) {
  return {
    type: FETCHING_APP_EXCLUSIVE_LIST,
    fetching: status
  };
}

export function fetchingVoucherExclusiveList(status) {
  return {
    type: FETCHING_VOUCHER_EXCLUSIVE_LIST,
    fetching: status
  };
}
export function receivedAppExclusiveList(payload) {
  return {
    type: RECEIVED_EXCLUSIVE_LIST,
    fetching: false,
    appExclusiveList: appExclusiveList,
    isAppExclusiveFetched: true,
    error: false
  };
}

export function receivedVoucherExclusiveList(payload) {
  return {
    type: RECEIVED_EXCLUSIVE_LIST,
    fetching: false,
    voucherExclusiveList: voucherExclusiveList,
    isVoucherExclusiveFetched: true,
    error: false
  };
}

export function appExclusiveListError(status) {
  return {
    type: APP_EXCLUSIVE_LIST_ERROR,
    error: status
  }
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
            // return dateB - dateA;
            var dateA = (a.sort),
              dateB = (b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("promotionList", {categoryName , data:promotionList});
        }
        dispatch(receivedPromotionList({categoryName , data:promotionList}));
    
        dispatch(getValueDealsList());
      })
      .catch(error => {
        dispatch(promotionListError(true));
      });
  };
};

export const getAppExclusiveList = () => {
  return dispatch => {
    dispatch(fetchingAppExclusiveList());
    let url = `${Config.url}getAppExclusiveDeals`;
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
        let appExclusiveList = [];
        const categoryName = response.data.categoryname;
        if (response.data.data.length > 0) {
          appExclusiveList = response.data.data;
          appExclusiveList.sort(function(a, b) {
            var dateA = new Date(a.sort),
              dateB = new Date(b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("appExclusiveList", {categoryName , data:appExclusiveList});
        }
        dispatch(receivedAppExclusiveList({categoryName , data:appExclusiveList}));
      })
      .catch(error => {
        dispatch(appExclusiveListError(true));
      });
  };
};

export const getVoucherExclusiveList = () => {
  return dispatch => {
    dispatch(fetchingVoucherExclusiveList());
    let url = `${Config.url}getinboxmessage`;
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
        let voucherExclusiveList = [];
        const categoryName = response.data.categoryname;
        if (response.data.data.length > 0) {
          voucherExclusiveList = response.data.data;
          voucherExclusiveList.sort(function(a, b) {
            var dateA = new Date(a.sort),
              dateB = new Date(b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("voucherExclusiveList", {categoryName , data:voucherExclusiveList});
        }
        dispatch(receivedAppExclusiveList({categoryName , data:voucherExclusiveList}));
      })
      .catch(error => {
        dispatch(appExclusiveListError(true));
      });
  };
};

export const getBestSellerList = () => {
  return dispatch => {
    dispatch(fetchingBestSellerList());
    let url = `${Config.url}getNewListBestsellingPromotionsValueDeals`;
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
        let sellerList = [];
        if (response.data.data.length > 0) {

          sellerList = response.data.data;
          sellerList.sort(function(a, b) {
            var dateA = new Date(a.sort),
              dateB = new Date(b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("sellerList", sellerList);
        }
        dispatch(receivedBestSellerList(sellerList));
      })
      .catch(error => {
        dispatch(sellerListError(true));
      });
  };
};

export const getBestSellerPizzaList = () => {
  return dispatch => {
    dispatch(fetchingBestSellerList());
    let url = `${Config.url}getBestSellingPizza`;
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
          pizzaList.sort(function(a, b) {
            var dateA = new Date(a.sort),
              dateB = new Date(b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("pizzaListBestSeller", pizzaList);
        }
      //  dispatch(receivedBestSellerList(sellerList));
      })
      .catch(error => {
        dispatch(sellerListError(true));
      });
  };
};


export const getChatbotStatus = () => {
  return dispatch => {
    let url = `${Config.url}getChatbotStatus`;
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
         dispatch(getChatbotData(response.data.data));
           saveLocalStorage("chatbotStatus",response.data.data)
      })
      .catch(error => {
        console.log(error)
      });
  };
};

export const fetchConfig = () => {
  return dispatch => {
    dispatch(fetchingPromotionList(true));
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
        if(!_.isEmpty(response.data.data) && _.has(response.data.data,"coupons")){
           saveLocalStorage("configurationData",response.data.data)
          saveLocalStorage("restrictedCoupon",response.data.data.coupons.data)
           dispatch(getConfig(response.data.data.coupons.data));
            dispatch(fetchingPromotionList(false));
            
        }
   

      })
      .catch(error => {
          dispatch(applyingVoucherCode(false));
    
      });
  };
};

export const geCustomerOrders  = (id) => {
  return dispatch => {
    let url = `${Config.url}getPreviousOrder?customer_id=${id}`;
    axios
      .get(url, {
      //    method: "get",
      // url: url,
      // timeout: 100000,
      // data: id,
        headers: {
          token: Config.token,
          "device-type": Config.devicetype,
          Accept: Config.Accept,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
         dispatch( getCustomerOrderStatus(response.data.data));
         if(response.data.data.length > 0){
         saveLocalStorage("prevOrder",true)
           saveLocalStorage("customerInfo","")

         }
         else{
           saveLocalStorage("prevOrder",false)
           saveLocalStorage("customerInfo","newCustomer")
         }
      
      })
      .catch(error => {
            saveLocalStorage("prevOrder",false)
            saveLocalStorage("customerInfo","newCustomer")
      });
  };
};

export const getBannerList = () => {
  return dispatch => {
    dispatch(fetchingBannerList());
    let url = `${Config.url}getBanner`;
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
        let bannerList = [];
        if (response.data.data.length > 0) {
          bannerList = response.data.data;
          const modifyBannerList = modifyList(bannerList);
            saveLocalStorage("bannerList",modifyBannerList)
          dispatch(receivedBannerList(modifyBannerList));
        }
        dispatch(getPromotionList());
        //this.getPromotionList();
      })
      .catch(error => {
        dispatch(bannerListError(true));
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
          valueDealsList.sort(function(a, b) {
            var dateA = new Date(a.sort),
              dateB = new Date(b.sort);
            return dateB - dateA;
          });
          saveLocalStorage("valueDealsList", {categoryName , data :valueDealsList});
        }
        dispatch(receivedValueDealsList({categoryName , data:valueDealsList}));
      })
      .catch(error => {
        dispatch(errorValueDealsList(true));
      });
  };
};

export const mountProductCategoryList = status => {
  return dispatch => {
    dispatch(setProductCategoryCompStatus(status));
  };
};

export const splashScreen = status => {
  return dispatch => {
    dispatch(showSplashScreen(status));
  };
};

export const actions = {
  getPromotionList,
  getValueDealsList,
  getBannerList,
  mountProductCategoryList,
  getBestSellerList
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
   [FETCHING_BESTSELLER_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
    [RECEIVED_BESTSELLER_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      sellerList: action.sellerList,
      isSellerFetched: action.isSellerFetched
    };
  },
    [GET_CHATBOT_STATUS]: (state, action) => {
    return {
      ...state,
      chatBotData: action.chatBotData
    };
  },
   [GET_CUSTOMER_ORDERS]: (state, action) => {
    return {
      ...state,
      ordersCount: action.ordersCount
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
  [PRODUCT_CATEGORY_COMP_STATUS]: (state, action) => {
    return {
      ...state,
      showProductCategoryComp: action.showProductCategoryComp
    };
  },
  [FETCHING_BANNER_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_BANNER_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      bannerList: action.bannerList,
      isBannerFetched: action.isBannerFetched
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
  [SHOW_SPLASH_SCREEN]: (state, action) => {
    return {
      ...state,
      showSplash: action.showSplash
    };
  },
  [FETCHING_APP_EXCLUSIVE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_EXCLUSIVE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      appExclusiveList: action.appExclusiveList,
      isAppExclusiveFetched: action.isAppExclusiveFetched
    };
  },
  [APP_EXCLUSIVE_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [FETCHING_VOUCHER_EXCLUSIVE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_VOUCHER_EXCLUSIVE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      voucherExclusiveList: action.voucherExclusiveList,
      isVoucherExclusiveFetched: action.isVoucherExclusiveFetched
    };
  },
  [VOUCHER_EXCLUSIVE_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [PROMOTION_LIST_ERROR]: promotionListError,
   [BESTSELLER_LIST_ERROR]: sellerListError,
  [ERROR_VALUE_DEALS]: errorValueDealsList,
  [BANNER_LIST_ERROR]: bannerListError
};

export const action = {
  splashScreen
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  error: false,
  promotionList: [],
  valueDealsList: [],
   sellerList: [],
    isSellerFetched: false,
  isPromotionFetched: false,
  isValueDealsFetched: false,
  currentDay: "",
  bannerList: [],
  showProductCategoryComp: false,
  showSplash: false,
  isBannerFetched: false,
  chatBotData:{},
  ordersCount:null,
  config:[],
  configuration:{},
  appExclusiveList: [],
  voucherExclusiveList: []
};

export default function menuReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
