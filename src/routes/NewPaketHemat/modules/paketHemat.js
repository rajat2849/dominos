
import axios from 'axios';
import _ from 'lodash';

import { Config, DEFAULT_SITE_LANGUAGE, AVAILABLE_LANGUAGE } from '../../../config/Config';
import { filterPromotionDetail, sortPromotionArray, filterValueDealsDetail, sortValueDealsArray, sortPizzaArray, filterPizzaDetail, prepareProductDetailArray, getSessionStorage, saveSessionStorage, prepareDefaultToppings, saveLocalStorage, sortPromotionDetail, getLocalStorage } from 'components/Helpers';
import { getProductPrice } from '../../../store/cart';

// -----------------------------------
// Globals variables
// -----------------------------------
let sectionBasedCrustArray = [];
let sectionBasedProductArray = [];

// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_DETAIL_PROMOTION = 'FETCHING_DETAIL_PROMOTION';
export const RECEIVED_DETAIL_PROMOTION = 'RECEIVED_DETAIL_PROMOTION';
export const ERROR_DETAIL_PROMOTION = 'ERROR_DETAIL_PROMOTION';
export const FETCHING_DETAIL_VALUE_DEALS = 'FETCHING_DETAIL_VALUE_DEALS';
export const RECEIVED_DETAIL_VALUE_DEALS = 'RECEIVED_DETAIL_VALUE_DEALS';
export const ERROR_DETAIL_VALUE_DEALS = 'ERROR_DETAIL_VALUE_DEALS';
export const FETCHING_DETAIL_PIZZA = 'FETCHING_DETAIL_PIZZA';
export const RECEIVED_DETAIL_PIZZA = 'RECEIVED_DETAIL_PIZZA';
export const ERROR_DETAIL_PIZZA = 'ERROR_DETAIL_PIZZA';
export const SET_FILTER_PROMOTION_LIST = 'SET_FILTER_PROMOTION_LIST';
export const SET_SORTED_PROMOTION_ARRAY = 'SET_SORTED_PROMOTION_ARRAY';
export const SET_COLAPSE_STATE = 'SET_COLAPSE_STATE';
export const SET_QUANTITY = 'SET_QUANTITY';
export const RESET_PIZZA_CONTAINER = 'RESET_PIZZA_CONTAINER';
export const RESET_IMAGE_CONTAINER = 'RESET_IMAGE_CONTAINER';
export const SET_VALUE_DEALS_LIST = 'SET_VALUE_DEALS_LIST';
export const SET_SORTED_VALUE_DEALS_ARRAY = 'SET_SORTED_VALUE_DEALS_ARRAY';
export const SET_PRODUCT_DETAIL_ARRAY = 'SET_PRODUCT_DETAIL_ARRAY';
export const SET_OTHER_THUMBNAIL = 'SET_OTHER_THUMBNAIL';
export const SET_SIDES_DESSERT_DETAIL = 'SET_SIDES_DESSERT_DETAIL';
export const SET_BEVERAGE_DETAIL = 'SET_BEVERAGE_DETAIL';
export const SET_FILTER_PIZZA_LIST = 'SET_FILTER_PIZZA_LIST';
export const SELECTED_PRODUCT_SIZE = 'SELECTED_PRODUCT_SIZE';
export const SET_SORTED_PIZZA_ARRAY = 'SET_SORTED_PIZZA_ARRAY';
export const SET_DEFAULT_ATTRIBUTES = 'SET_DEFAULT_ATTRIBUTES';
export const RESET_ALL_PROPS = 'RESET_ALL_PROPS';
export const FETCHING_TOPPING_DETAIL = 'FETCHING_TOPPING_DETAIL';
export const RECEIVED_TOPING_DETAIL = 'RECEIVED_TOPING_DETAIL';
export const ERROR_TOPPING_DETAIL = 'ERROR_TOPPING_DETAIL';
export const SET_DEFAULT_TOPPINGS = 'SET_DEFAULT_TOPPINGS';
export const SET_DEFAULT_PERSONAL_TOPPINGS = 'SET_DEFAULT_PERSONAL_TOPPINGS';
export const SET_TOPPING_TITLE = 'SET_TOPPING_TITLE';
export const SELECTED_PRODUCT_CRUST = 'SELECTED_PRODUCT_CRUST';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const SET_PARENT_SKU = 'SET_PARENT_SKU';
export const SETTING_UPDATED_PRICE = 'SETTING_UPDATED_PRICE';
export const SETTING_TOPPING_STATUS = 'SETTING_TOPPING_STATUS';
export const SET_PIXE_VIEW_CONTENT_VALUE = 'SET_PIXE_VIEW_CONTENT_VALUE';
export const SET_PRODUCT_ID_FOR_PIXEL = 'SET_PRODUCT_ID_FOR_PIXEL';
export const SET_PROPS_ON_ADD_TO_CART = 'SET_PROPS_ON_ADD_TO_CART';
export const FETCHING_PRODUCT_PRICE = 'FETCHING_PRODUCT_PRICE';
export const FETCHING_DETAIL_SIDES = 'FETCHING_DETAIL_SIDES';
export const RECEIVED_DETAIL_SIDES = 'RECEIVED_DETAIL_SIDES';
export const ERROR_DETAIL_SIDES = 'ERROR_DETAIL_SIDES';
export const SET_PRODUCT_CATEGORY = 'SET_PRODUCT_CATEGORY';
export const SET_DEFAULT_ATTRIBUTES_FOR_SIDE_AND_DESSERT = 'SET_DEFAULT_ATTRIBUTES_FOR_SIDE_AND_DESSERT';
export const SET_SIDE_CHICKEN_PRODUCT = 'SET_SIDE_CHICKEN_PRODUCT';

// ------------------------------------
// Actions
// ------------------------------------

export function fetchingDetailPromotion() {
  return {
    type: FETCHING_DETAIL_PROMOTION,
    fetching: true,
  };
}

export function receivedDetailPromotion(promotionDetail, sortedPromotionDetail) {
  return {
    type: RECEIVED_DETAIL_PROMOTION,
    fetching: false,
    promotionDetail: promotionDetail,
    sortedPromotionDetail: sortedPromotionDetail,
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
    fetching: true,
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

export function fetchingDetailPizza(status) {
  return {
    type: FETCHING_DETAIL_PIZZA,
    fetching: status,
  };
}

export function receivedDetailPizza(pizzaDetail) {
  return {
    type: RECEIVED_DETAIL_PIZZA,
    fetching: false,
    pizzaDetail: pizzaDetail,
    error: false
  };
}

export function errorDetailPizza(status) {
  return {
    type: ERROR_DETAIL_PIZZA,
    fetching: false,
    error: status
  };
}

export function setFilterPromotionList(payload) {
  return {
    type: SET_FILTER_PROMOTION_LIST,
    promotionProductList: payload
  };
}

export function setSortedPromotionArray(payload) {
  return {
    type: SET_SORTED_PROMOTION_ARRAY,
    sortedPromotionArray: payload
  };
}

export function setColapsingState(colapseClassName) {
  return {
    type: SET_COLAPSE_STATE,
    colapseClassName: colapseClassName
  };
}

export function _quantity(quantity) {
  return {
    type: SET_QUANTITY,
    quantity: quantity
  };
}

export function resetPizzaContainerProp() {
  return {
    type: RESET_PIZZA_CONTAINER,
    size: [],
    crust: [],
    promotionProductList: [],
    valueDealsProductList: [],
    pizzaProductList: [],
    sortedPromotionArray: [],
  };
}

export function resetImageContainerProp() {
  return {
    type: RESET_IMAGE_CONTAINER,
    productBeverageDetail: []
  };
}

export function setFilterValueDealsList(payload) {
  return {
    type: SET_VALUE_DEALS_LIST,
    valueDealsProductList: payload
  };
}

export function setSortedValueDealsArray(payload) {
  return {
    type: SET_SORTED_VALUE_DEALS_ARRAY,
    sortedValueDealsArray: payload
  };
}

export function setProductDetailArray(payload) {
  return {
    type: SET_PRODUCT_DETAIL_ARRAY,
    productDetailArray: payload
  };
}

export function setOtherThumbnail(thumbnail) {
  return {
    type: SET_OTHER_THUMBNAIL,
    otherThumbnail: thumbnail
  };
}

export function setProductDetailSides(sidesDessert) {
  return {
    type: SET_SIDES_DESSERT_DETAIL,
    productSidesDetail: sidesDessert
  };
}

export function setProductDetailBeverage(beverage) {
  return {
    type: SET_BEVERAGE_DETAIL,
    productBeverageDetail: beverage
  };
}

export function setFilterPizzaList(pizzaList) {
  return {
    type: SET_FILTER_PIZZA_LIST,
    pizzaProductList: pizzaList
  };
}

export function setProductSize(size) {
  return {
    type: SELECTED_PRODUCT_SIZE,
    selectedProductSize: size
  };
}

export function setSortedPizzaArray(pizzaSortedArray) {
  return {
    type: SET_SORTED_PIZZA_ARRAY,
    sortedPizzaArray: pizzaSortedArray
  };
}

export function setDefaultAttributes(size, crust, thumbnail, description, sku, price, crust_image, defaultCrust, defaultSize, default_topping, sectionBasedCrustArray, sectionBasedProductArray) {
  return {
    type: SET_DEFAULT_ATTRIBUTES,
    size: size,
    crust: crust,
    thumbnail: thumbnail,
    description: description,
    sku: sku,
    price: price,
    crust_image: crust_image,
    defaultCrust: defaultCrust,
    defaultSize: defaultSize,
    default_topping: default_topping,
    sectionBasedCrustArray: sectionBasedCrustArray,
    sectionBasedProductArray: sectionBasedProductArray,
  };
}

export function resetAllProps() {
  return {
    type: RESET_ALL_PROPS,
    size: [],
    crust: [],
    promotionProductList: [],
    valueDealsProductList: [],
    pizzaProductList: [],
    productBeverageDetail: [],
    productSidesDetail: [],
    quantity: 1,
    productDetailArray: [],
    sortedPromotionArray: [],
    defaultToppings: [],
    defaultPersonalToppings: [],
    allToppings: [],
    updatedPrice: 0,
    isToppingSet: false,
    pixelViewContentValue: 0,
    productId: '',
    chicken: [],
    sauce: [],
    defaultSideProduct: {},
  }
}

export function fetchingTopingDetail(status) {
  return {
    type: FETCHING_TOPPING_DETAIL,
    topFetching: status,
  };
}

export function receivedTopingDetail(topings) {
  return {
    type: RECEIVED_TOPING_DETAIL,
    allToppings: topings,
  };
}

export function errorToppingDetail(status) {
  return {
    type: ERROR_TOPPING_DETAIL,
    topError: status
  };
}

export function settingDefaultToppings(defaultToppings) {
  return {
    type: SET_DEFAULT_TOPPINGS,
    defaultToppings: defaultToppings
  };
}

export function settingDefaultPersonalToppings(defaultToppings) {
  return {
    type: SET_DEFAULT_PERSONAL_TOPPINGS,
    defaultPersonalToppings: defaultToppings
  };
}

export function setToppingTitle(title) {
  return {
    type: SET_TOPPING_TITLE,
    toppingTitle: title
  };
}

export function setProductCrust(crust) {
  return {
    type: SELECTED_PRODUCT_CRUST,
    selectedProductCrust: crust
  };
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

export function setParentSku(sku) {
  return {
    type: SET_PARENT_SKU,
    parentSku: sku
  };
}

export function settingUpdatedPrice(price) {
  return {
    type: SETTING_UPDATED_PRICE,
    updatedPrice: price
  };
}

export function setToppingStatus(status) {
  return {
    type: SETTING_TOPPING_STATUS,
    isToppingSet: status
  };
}

export function setPixelViewContentValue(value) {
  return {
    type: SET_PIXE_VIEW_CONTENT_VALUE,
    pixelViewContentValue: value
  };
}

export function setProductIdForPixel(id) {
  return {
    type: SET_PRODUCT_ID_FOR_PIXEL,
    productId: id
  };
}

export function setPropsOnAddToCart() {
  return {
    type: SET_PROPS_ON_ADD_TO_CART,
    updatedPrice: 0,
    defaultToppings: [],
    defaultPersonalToppings: [],
    allToppings: [],
  };
}

export function fetchingProductPrice(status) {
  return {
    type: FETCHING_PRODUCT_PRICE,
    fetchingPrice: status
  };
}

export function fetchingDetailSides(status) {
  return {
    type: FETCHING_DETAIL_SIDES,
    fetching: status
  };
}

export function receivedDetailSides(sidesDetail) {
  return {
    type: RECEIVED_DETAIL_SIDES,
    sidesDetail: sidesDetail,
  };
}

export function errorDetailSides(status) {
  return {
    type: ERROR_DETAIL_SIDES,
    error: status,
  };
}

export function setProductCategory(category) {
  return {
    type: SET_PRODUCT_CATEGORY,
    childProductCategory: category,
  };
}

export function setDefaultAttributesForSideAndDessert(size, chicken, sauce, defaultSideProduct) {
  return {
    type: SET_DEFAULT_ATTRIBUTES_FOR_SIDE_AND_DESSERT,
    size: size,
    chicken: chicken,
    sauce:sauce,
    defaultSideProduct: defaultSideProduct
  };
}

export function setSideSelectedProduct(chicken, sauce='', size='') {
  return {
    type: SET_SIDE_CHICKEN_PRODUCT,
    selectedChicken: chicken,
    selectedSauce: sauce,
    selectedSize: size,
  };
}

// ------------------------------------
// Action creators
// ------------------------------------

export const getProductDetailPromotions = (sku) => {
  return (dispatch) => {
    dispatch(fetchingDetailPromotion());
    let url = `${Config.url}getDetailPromotions`;
    axios.get(url, {
      params: {
        sku: sku
      },
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let promotionDetail = {};
      if(!_.isEmpty(response.data.data)) {
        promotionDetail = response.data.data;
        let promotionList = [];
        let sortedArray = [];
        let productDetailArray = [];
        let sortedPromotionDetail = [];
        productDetailArray = prepareProductDetailArray(promotionDetail.options, 'promotion');
        promotionList = filterPromotionDetail(promotionDetail);
        sortedPromotionDetail = sortPromotionDetail(promotionDetail.options);
        sortedArray = sortPromotionArray(promotionDetail);
        sortedArray['upgrade'] = response.data.data.upgrade;
        dispatch(setProductDetailArray(productDetailArray));
        dispatch(receivedDetailPromotion(promotionDetail, sortedPromotionDetail));
        dispatch(setFilterPromotionList(promotionList));
        dispatch(setSortedPromotionArray(sortedArray));
        dispatch(setPixelViewContentValue(response.data.data.price));
      }
    }).catch( error => {
      dispatch(errorDetailPromotion(true));
    });
  };
};




export const getProductDetailValueDeals = (sku) => {
  return (dispatch) => {
    dispatch(fetchingDetailValueDeals());
    let url = `${Config.url}getdetailvaluedeals`;
    axios.get(url, {
      params: {
        sku: sku
      },
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let valueDetail = {};
      if(!_.isEmpty(response.data.data)) {
        valueDetail = response.data.data;
        let valueDealsList = [];
        let valueDealsSortedArray = [];
        let productDetailArray = [];
        valueDealsSortedArray = response.data.data.options;
        valueDealsSortedArray['upgrade'] = response.data.data.upgrade;
        valueDealsList = filterValueDealsDetail(valueDetail);
        dispatch(setSortedValueDealsArray(valueDealsSortedArray));
        dispatch(receivedDetailValueDeals(valueDetail));
        dispatch(setFilterValueDealsList(valueDealsList));
        dispatch(setPixelViewContentValue(response.data.data.price));
      }
    }).catch( error => {
      dispatch(errorDetailValueDeals(true));
    });
  };
};

export const getProductDetailPizza = (sku) => {
  return (dispatch) => {
    dispatch(fetchingDetailPizza(true));
    let url = `${Config.url}getdetailpizza`;
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: {
          sku: sku
        },
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': Config.Accept,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }).then( response => {
        let pizzaDetailResp = {};
        if(!_.isEmpty(response.data.data)) {
          pizzaDetailResp = response.data.data;
          let pizzaList = [];
          let pizzaDetail = {};
          let pizzaSortedArray = [];
          let productDetailArray = [];
          pizzaDetail = filterPizzaDetail(pizzaDetailResp);
          /*
            pizza container needs pizza detail on 0, 1, 2.. index keys
          */
          pizzaList.push(pizzaDetail);
          pizzaSortedArray = sortPizzaArray(pizzaDetailResp, sku);
          productDetailArray = prepareProductDetailArray(pizzaDetailResp.options);
          dispatch(setProductDetailArray(productDetailArray));
          dispatch(receivedDetailPizza(pizzaDetailResp));
          dispatch(setFilterPizzaList(pizzaList));
          dispatch(setSortedPizzaArray(pizzaSortedArray));
          dispatch(fetchingDetailPizza(false));
          dispatch(setPixelViewContentValue(response.data.data.price));
          resolve(true);
        }
      }).catch( error => {
        resolve(true);
        dispatch(errorDetailPizza(true));
      });
    });
  };
};

export const setSectionDetail = (list, name, section, container, selectedValue, selectedType) =>{
  return async (dispatch, getState) => {
    let crust = [];
    let size = [];
    let chicken = [];
    let sauce = [];
    let sidesDessertProduct = [];
    let defaultSideProduct = {};
    let thumbnail = '';
    let description = '';
    let sku = '';
    let price = '';
    let crust_image = '';
    let defaultCrust = '';
    let defaultSize = '';
    let sizeValue = '';
    let default_topping = [];
    const langId = getState().i18nState.lang;
    let sitelang = (typeof langId !== 'undefined' && AVAILABLE_LANGUAGE.indexOf(langId) > 0) ? langId : DEFAULT_SITE_LANGUAGE;
    if (sitelang === 'id') {
      sitelang = 'idn';
    }
    if(typeof container !== undefined && container != '' && container === 'pizza') {
      /*
       *  Required toppingStatus, personalToppings, toppings, if user customize the size and crust after customization of  *  toppings then we need to update the price and product in both case (for size and crust customization).
       */
      let toppingStatus = getSessionStorage('toppingStatus');
      let personalToppings = getSessionStorage('personalToppings');
      let toppings = getSessionStorage('upadtedToppings');
      let newsize = Object.keys(list);
      newsize.map((crust_Size) => {
        if (crust_Size === 'Medium') {
          size.unshift(crust_Size);
        } else {
          if (size.indexOf(crust_Size) < 0) {
            size.push(crust_Size);
          }
        }
      })
      /*
      *  case for crust customization
      */
      if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'crust') {
        defaultCrust = selectedValue;
        dispatch(setProductCrust(defaultCrust));
        sizeValue = getState().ProductDetails.selectedProductSize;
        list[sizeValue].map((item) => {
          crust.push(Object.keys(item)[0]);
          if (Object.keys(item)[0] === defaultCrust) {
            thumbnail = item[defaultCrust].crust_image;
            description = item[defaultCrust][`crust_description_${sitelang}`];
            price = item[defaultCrust].price;
            sku = item[defaultCrust].sku;
            defaultCrust = item[defaultCrust].crust;
            defaultSize = item[defaultCrust].size;
            default_topping = prepareDefaultToppings(item[defaultCrust].default_topping);
          }
        })
        /*
        *  updating the price if user customize the crust after customization of toppings
        */
        if ((typeof toppings !== 'undefined' && toppings !== null && toppings.length > 0) && (defaultSize === 'Medium' || defaultSize === 'Large' || defaultSize === 'Personal') && toppingStatus === true) {
          //-------- start --------//
          let toppingOptions = {};
          if (typeof personalToppings !== 'undefined' && defaultSize === 'Personal') {
            personalToppings.map((topping) => {
              if (topping != null) {
                if ( typeof topping.additionalCount !== 'undefined' && isNaN(topping.additionalCount) === false && topping.additionalCount > 0) {
                  toppingOptions[`${topping.name}`] = (topping.additionalCount > 3) ? 3 : topping.additionalCount;
                } else {
                  toppingOptions[`${topping.name}`] = topping.count;
                }
              }
            });
          } else if (defaultSize !== 'Personal') {
            toppings.map((topping) => {
              if (topping != null) {
                if ( typeof topping.additionalCount !== 'undefined' && isNaN(topping.additionalCount) === false && topping.additionalCount > 0) {
                  toppingOptions[`${topping.name}`] = (topping.additionalCount > 3) ? 3 : topping.additionalCount;
                } else {
                  toppingOptions[`${topping.name}`] = topping.count;
                }
              }
            });
          }
          dispatch(fetchingProductPrice(true));
          const productPrice = await getProductPrice(sku, toppingOptions);
          // // --- end ---- //
          let sessionCart = getSessionStorage('cart');
          sessionCart[Object.keys(sessionCart)[0]].price = productPrice * parseInt(sessionCart[Object.keys(sessionCart)[0]].qty);
          saveSessionStorage('cart', sessionCart);
          dispatch(setToppingStatus(true));
          dispatch(settingUpdatedPrice(productPrice));
        }
      }

      /*
      *  case for size customization
      */
      if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'size') {
        sizeValue = selectedValue;
        dispatch(setProductSize(sizeValue));
        list[sizeValue].map((item) => {
          const new_crust = Object.keys(item)[0];
          if (new_crust === 'Classic Handtossed ') {
            crust.unshift(new_crust);
          } else {
            if (crust.indexOf(new_crust) < 0) {
              crust.push(new_crust);
            }
          }
          if (Object.keys(item)[0] === crust[0]) {
            thumbnail = item[crust[0]].crust_image;
            description = item[crust[0]][`crust_description_${sitelang}`];
            price = item[crust[0]].price;
            sku = item[crust[0]].sku;
            defaultCrust = item[crust[0]].crust;
            defaultSize = item[crust[0]].size;
            default_topping = prepareDefaultToppings(item[crust[0]].default_topping);
          }
        });
       /*
        *  updating the price if user customize the size after customization of toppings
        */
        if ((typeof toppings !== 'undefined' && toppings !== null && toppings.length > 0) && (defaultSize === 'Medium' || defaultSize === 'Large' || defaultSize === 'Personal') && toppingStatus === true) {
          // --- start ---- //
          let toppingOptions = {};
          if (typeof personalToppings !== 'undefined' && defaultSize === 'Personal') {
            personalToppings.map((topping) => {
              if (topping != null) {
                if ( typeof topping.additionalCount !== 'undefined' && isNaN(topping.additionalCount) === false && topping.additionalCount > 0) {
                  toppingOptions[`${topping.name}`] = (topping.additionalCount > 3) ? 3 : topping.additionalCount;
                } else {
                  toppingOptions[`${topping.name}`] = topping.count;
                }
              }
            });
          } else if (defaultSize !== 'Personal') {
            toppings.map((topping) => {
              if (topping != null) {
                if ( typeof topping.additionalCount !== 'undefined' && isNaN(topping.additionalCount) === false && topping.additionalCount > 0) {
                  toppingOptions[`${topping.name}`] = (topping.additionalCount > 3) ? 3 : topping.additionalCount;
                } else {
                  toppingOptions[`${topping.name}`] = topping.count;
                }
              }
            });
          }
          dispatch(fetchingProductPrice(true));
          const productPrice = await getProductPrice(sku, toppingOptions);
          // // --- end ---- //
          let sessionCart = getSessionStorage('cart');
          sessionCart[Object.keys(sessionCart)[0]].price = productPrice * parseInt(sessionCart[Object.keys(sessionCart)[0]].qty);
          saveSessionStorage('cart', sessionCart);
          dispatch(setToppingStatus(true));
          dispatch(settingUpdatedPrice(productPrice));
        }
      } else if (selectedValue === '' && selectedType === '') {
        /*
        *  default case for pizza
        */
        sizeValue = size[0];
        let ClassicHandtossedCrustName = '';
        dispatch(setProductSize(sizeValue));
        list[size[0]].map((item, index) => {
          const new_crust = Object.keys(item)[0];
          if (new_crust === 'Classic Handtossed ') {
            crust.unshift(new_crust);
          } else {
            if (crust.indexOf(new_crust) < 0) {
              crust.push(new_crust);
            }
          }
          let updatedCart = getSessionStorage('cart');
          let toppingStatus = getSessionStorage('toppingStatus');
          let toppings = getSessionStorage('upadtedToppings');
          if (Object.keys(item)[0] === crust[0]) {
            thumbnail = item[crust[0]].crust_image;
            description = item[crust[0]][`crust_description_${sitelang}`];
            /*
             *  updated the price if we already have the updatied price by topping customization otherwise update it by
             *  default price. at topping customization time we save the topping price at cart.price key.
             */
            price = (updatedCart !== undefined && Object.keys(updatedCart).length > 0) ? updatedCart[Object.keys(updatedCart)].price : item[crust[0]].price;
            let toppingOptions = {};
            toppings.map((topping) => {
              if (topping != null) {
                if ( typeof topping.additionalCount !== 'undefined' && isNaN(topping.additionalCount) === false && topping.additionalCount > 0) {
                  toppingOptions[`${topping.name}`] = (topping.additionalCount > 3) ? 3 : topping.additionalCount;
                } else {
                  toppingOptions[`${topping.name}`] = topping.count;
                }
              }
            });
            sku = item[crust[0]].sku;
            defaultCrust = item[crust[0]].crust;
            defaultSize = item[crust[0]].size;
            default_topping = prepareDefaultToppings(item[crust[0]].default_topping);
          }
          // set the updated price only when toppingstatus is true.
          if ((typeof toppings !== 'undefined' && toppings !== null && toppings.length > 0) && toppingStatus === true) {
            dispatch(settingUpdatedPrice(price));
          }
        });
      }
    } else if (typeof container !== undefined && container !== '' && container === 'valueDeals') {
      if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'crust') {
        /*
         *  case of crust customization
         */
        defaultCrust = selectedValue;
        dispatch(setProductCrust(defaultCrust));
        list.map((products, index) => {
          if (products.title === 'Choose One Pizza') {
            products.item.map((product) => {
              let crustName = product.crust;
              let sizeName = product.size;
              if (product.crust === selectedValue) {
                thumbnail = product.thumbnail;
                crust_image = product.crust_image;
                description = product[`crust_description_${sitelang}`];
                price = product.price;
                sku = product.sku;
              }
              if (crust.indexOf(crustName) < 0) {
                crust.push(crustName);
              }
              if(size.indexOf(sizeName) < 0) {
                size.push(sizeName);
              }
            })
          }
        })
      } else {
        /*
        *  Default case for valuedeals
        */
        list.map((products, index) => {
          if (products.title === 'Choose One Pizza') {
            products.item.map((product) => {
              let crustName = product.crust;
              let sizeName = product.size;
              thumbnail = product.thumbnail;
              crust_image = product.crust_image;
              description = product[`crust_description_${sitelang}`];
              price = product.price;
              sku = product.sku;
              if (crust.indexOf(crustName) < 0) {
                crust.push(crustName);
              }
              if(size.indexOf(sizeName) < 0) {
                size.push(sizeName);
              }
            })
          }
        })
      }
    } else if (typeof container !== undefined && container !== '' && container === 'promotion') {
      if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'crust') {
        defaultCrust = selectedValue;
        dispatch(setProductCrust(defaultCrust));
        size = Object.keys(list);
        sizeValue = 'Medium';
        list[sizeValue].map((item) => {
          if (crust.indexOf(Object.keys(item)[0]) < 0) {
            crust.push(Object.keys(item)[0]);
          }
          if (Object.keys(item)[0] === defaultCrust) {
            thumbnail = item[defaultCrust].crust_image;
            description = item[defaultCrust][`crust_description_${sitelang}`];
            price = item[defaultCrust].price;
            sku = item[defaultCrust].sku;
            defaultCrust = item[defaultCrust].crust;
            defaultSize = item[defaultCrust].size;
            default_topping = prepareDefaultToppings(item[defaultCrust].default_topping);
          }
        })
      } else if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'size') {
        defaultCrust = Object.keys(list[selectedValue][0])[0];
        dispatch(setProductCrust(defaultCrust));
        sizeValue = selectedValue;
        size = Object.keys(list);
        dispatch(setProductSize(size));
        list[sizeValue].map((item) => {
          if (crust.indexOf(Object.keys(item)[0]) < 0) {
            crust.push(Object.keys(item)[0]);
          }
          if (Object.keys(item)[0] === defaultCrust) {
            thumbnail = item[defaultCrust].crust_image;
            description = item[defaultCrust][`crust_description_${sitelang}`];
            price = item[defaultCrust].price;
            sku = item[defaultCrust].sku;
            defaultCrust = item[defaultCrust].crust;
            defaultSize = sizeValue;
            default_topping = prepareDefaultToppings(item[defaultCrust].default_topping);
          }
        })
      } else {
        /*
         *  defaule case for promotion
         */
        let productInformation = {};
        list[section][name].map((product) => {
          const new_crust = Object.keys(product)[0];
          let sizeName = Object.keys(product[new_crust])[0];
          if (sizeName === 'Medium' && new_crust === 'Classic Handtossed ') {
            crust.unshift(new_crust);
          } else {
            if (crust.indexOf(new_crust) < 0) {
              crust.push(new_crust);
            }
          }
          if(size.indexOf(sizeName) < 0) {
            size.push(sizeName);
          }
          sectionBasedCrustArray[section] = [];
          sectionBasedCrustArray[section].push(crust);
        })
        list[section][name].map((product, index) => {
          if (Object.keys(product)[0] === crust[0]) {
            let crustName = Object.keys(product)[0];
            let sizeName = Object.keys(product[crustName])[0];
            thumbnail = product[crust[0]][sizeName].thumbnail;
            crust_image = product[crust[0]][sizeName].crust_image;
            description = product[crust[0]][sizeName][`crust_description_${sitelang}`];
            price = product[crust[0]][sizeName].price;
            sku = product[crust[0]][sizeName].sku;
            productInformation = {
              sku: sku,
              description: description,
              crust_image: crust_image,
              thumbnail: thumbnail,
              price: price,
            }
          }
          sectionBasedProductArray[section] = [];
          sectionBasedProductArray[section].push(productInformation);
        });
      } 
    } else if (typeof container !== 'undefined' && container !== '' && container === 'sideDesert' && getState().ProductDetails.childProductCategory === 'Rice') {
      const productName = getLocalStorage('productName');
      if (productName === 'Beef & Rice') {
        let sizeArray = [];
        let sauceArray = Object.keys(list);
        sauce = sauceArray;
        list[sauce[0]].map((sauceType, index) => {
          sizeArray = Object.keys(sauceType);
          const new_size = Object.keys(sauceType)[0];
          if (new_size === 'Medium' && size.indexOf(new_size) < 0) {
            size.unshift(new_size);
          } else if (size.indexOf(new_size) < 0) {
            size.push(new_size);
          }
        });

        if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'souce') {
          /*
           *  case of sauce customization
           */
          const selectedSize = getState().ProductDetails.selectedSize;
          dispatch(setSideSelectedProduct('', selectedValue, selectedSize));
          list[selectedValue].map((sauceType, index) => {
            sizeArray = Object.keys(sauceType);
            const new_size = Object.keys(sauceType)[0];
            if (size.indexOf(new_size) < 0) {
              size.push(new_size);
            }
            if (Object.keys(sauceType)[0] === selectedSize) {
              defaultSideProduct = sauceType[Object.keys(sauceType)[0]]
            }
          });
        } else if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'size') {
          /*
           *  case of size customization
           */
          const selectedSauce = getState().ProductDetails.selectedSauce;
          dispatch(setSideSelectedProduct('', selectedSauce, selectedValue));
          list[selectedSauce].map((sauceType, index) => {
            sizeArray = Object.keys(sauceType);
            const new_size = Object.keys(sauceType)[0];
            if (size.indexOf(new_size) < 0) {
              size.push(new_size);
            }
            if (Object.keys(sauceType)[0] === selectedValue) {
              defaultSideProduct = sauceType[Object.keys(sauceType)[0]]
            }
          });
        } else if (selectedValue === '' && selectedType === '') {
          /*
           *  Default case of Side for Beef & Rice product  
           */
          const sauceValue = sauceArray[0];
          list[sauceValue].map((sauceType, index) => {
            sizeArray = Object.keys(sauceType);
            const new_size = Object.keys(sauceType)[0];
            if (Object.keys(sauceType)[0] === size[0]) {
              defaultSideProduct = sauceType[Object.keys(sauceType)[0]]
            }
          });
          dispatch(setSideSelectedProduct('', sauceValue, size[0]));
        }
      } else {
        /*
         *  i am creating chickenArray in case if we need to customize the particular key at oth position 
         *  otherwise i can take directly to the chicken defined above.
         */
        let sauceArray = [];
        let chickenArray = Object.keys(list);
        chickenArray.map((item) => {
          if (item === 'Klassic Fried Chicken') {
            chicken.unshift(item);
          } else if (chicken.indexOf(item) < 0) {
            chicken.push(item);
          }
        });
        const chickenValue = chicken[0];
        list[chickenValue].map((chickenType, index) => {
          sauceArray = Object.keys(chickenType);
          const new_sauce = Object.keys(chickenType)[0];
          if (new_sauce === 'Original' && sauce.indexOf(new_sauce) < 0) {
            sauce.unshift(new_sauce);
          } else if (sauce.indexOf(new_sauce) < 0) {
            sauce.push(new_sauce);
          }
          const new_size = chickenType[Object.keys(chickenType)[0]].size;
          if (new_sauce === sauce[0]) { 
            if (new_size === 'Medium' && size.indexOf(new_size) < 0) {
              size.unshift(new_size);
            } else if (size.indexOf(new_size) < 0) {
              size.push(new_size);
            }
          }
        });

        /*
         *  case of chicken customization
         */
        if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'chicken') {
          /*
           *  case of chicken customization
           */
          let selectedSauce = getState().ProductDetails.selectedSauce;
          let selectedSize = getState().ProductDetails.selectedSize;
          dispatch(setSideSelectedProduct(selectedValue, selectedSauce, selectedSize));
          list[selectedValue].map((chickenType, index) => {
            sauceArray = Object.keys(chickenType);
            const new_sauce = Object.keys(chickenType)[0];
            if (sauce.indexOf(new_sauce) < 0) {
              sauce.push(new_sauce);
            }
            if (new_sauce === selectedSauce) {
              const new_size = chickenType[Object.keys(chickenType)[0]].size;
              if (size.indexOf(new_size) < 0) {
                size.push(new_size);
              }
            }
          });
          list[selectedValue].map((chickenType)=> {
            if (sauce.indexOf(selectedSauce) < 0) {
              selectedSauce = sauce[0];
            }
            if (size.indexOf(selectedSize) < 0) {
              selectedSize = size[0];
            }
            if (Object.keys(chickenType)[0] === selectedSauce && chickenType[Object.keys(chickenType)[0]].size === selectedSize) {
              defaultSideProduct = chickenType[Object.keys(chickenType)[0]];
            }
          });
        } else if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'souce') {
          /*
           *  case of sauce customization
           */
          let selectedChicken = getState().ProductDetails.selectedChicken;
          let selectedSize = getState().ProductDetails.selectedSize;
          dispatch(setSideSelectedProduct(selectedChicken, selectedValue, selectedSize));
          list[selectedChicken].map((chickenType, index) => {
            sauceArray = Object.keys(chickenType);
            const new_sauce = Object.keys(chickenType)[0];
            if (sauce.indexOf(new_sauce) < 0) {
              sauce.push(new_sauce);
            }
            if (new_sauce === selectedValue) {
              const new_size = chickenType[Object.keys(chickenType)[0]].size;
              if (size.indexOf(new_size) < 0) {
                size.push(new_size);
              }
            }
          });
          list[selectedChicken].map((chickenType, index) => {
            if (size.indexOf(selectedSize) < 0) {
              selectedSize = size[0];
            }
            if (Object.keys(chickenType)[0] === selectedValue && chickenType[Object.keys(chickenType)[0]].size === selectedSize) {
              defaultSideProduct = chickenType[Object.keys(chickenType)[0]];
            }
          });
        } else if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'size') {
          /*
           *  case of size customization
           */
          let selectedChicken = getState().ProductDetails.selectedChicken;
          let selectedSauce = getState().ProductDetails.selectedSauce;
          sauce = getState().ProductDetails.sauce;
          dispatch(setSideSelectedProduct(selectedChicken, selectedSauce, selectedValue));
          list[selectedChicken].map((chickenType, index) => {
            sauceArray = Object.keys(chickenType);
            const new_size = chickenType[Object.keys(chickenType)[0]].size;
            if (size.indexOf(new_size) < 0) {
              size.push(new_size);
            }
            if (sauce.indexOf(selectedSauce) < 0) {
              selectedSauce = sauce[0];
            }
            if (Object.keys(chickenType)[0] === selectedSauce && chickenType[Object.keys(chickenType)[0]].size === selectedValue) {
              defaultSideProduct = chickenType[Object.keys(chickenType)[0]];
            }
          });
        } else if (selectedValue === '' && selectedType === '') {
          /*
           *  Default case of Side for Chicken & Rice product
           */
          list[chickenValue].map((chickenType, index) => {
            if (Object.keys(chickenType)[0] === sauce[0]) {
              if (chickenType[Object.keys(chickenType)[0]].size === size[0]) {
                defaultSideProduct = chickenType[Object.keys(chickenType)[0]];
              }
            }
          });
          dispatch(setSideSelectedProduct(chickenValue, sauce[0], size[0]));
        }
      }
    }

    if (container === 'sideDesert') {
      dispatch(setDefaultAttributesForSideAndDessert(size, chicken, sauce, defaultSideProduct));
    } else { 
      if (typeof selectedValue !== 'undefined' && typeof selectedType !== 'undefined' && selectedValue !== '' && selectedType === 'crust') {
        dispatch(setProductCrust(selectedValue));
      } else{
        dispatch(setProductCrust(crust[0]));
      }
      dispatch(setDefaultAttributes(size, crust, thumbnail, description, sku, price, crust_image, defaultCrust, defaultSize, default_topping, sectionBasedCrustArray, sectionBasedProductArray));
      setTimeout(() => {
        dispatch(fetchingProductPrice(false));
      }, 2000);
    }
  };
};


export const setColapsestate = (name) => {
  return (dispatch) => {
    let colapseClassName = '';
    switch(name) {
    case 'upArrow':
      colapseClassName = 'show-detail';
      dispatch(setColapsingState(colapseClassName));
      break;
    case 'downArrow':
      colapseClassName = '';
      dispatch(setColapsingState(colapseClassName));
      break;
    }
  };
};

export const setQuantity = (name, quantity) => {
  return (dispatch, getState) => {
    let updatedQuantity = quantity;
    let cartItem = {};
    cartItem = getSessionStorage('cart');
    let price = parseFloat(cartItem[Object.keys(cartItem)].price);
    let singleQtyPrice = (price / cartItem[Object.keys(cartItem)].qty);
    switch(name) {
      case 'add':
        quantity++;
        updatedQuantity = quantity;
        dispatch(_quantity(quantity));
        cartItem[Object.keys(cartItem)].qty = updatedQuantity;
        cartItem[Object.keys(cartItem)].price = (singleQtyPrice * updatedQuantity);
        saveSessionStorage('cart', cartItem);
        break;
      case 'substract':
        if(quantity > 1) {
          quantity--;
        }
        updatedQuantity = quantity;
        dispatch(_quantity(quantity));
        cartItem[Object.keys(cartItem)].qty = updatedQuantity;
        cartItem[Object.keys(cartItem)].price = (singleQtyPrice * updatedQuantity);
        saveSessionStorage('cart', cartItem);
        break;
      case 'set':
        updatedQuantity = quantity;
        dispatch(_quantity(quantity));
        cartItem[Object.keys(cartItem)].qty = updatedQuantity;
        cartItem[Object.keys(cartItem)].price = (singleQtyPrice * updatedQuantity);
        saveSessionStorage('cart', cartItem);
        break;
      }
  };
};

export const resetPizzaContainer = () => {
  return (dispatch) => {
    dispatch(resetPizzaContainerProp());
  };
};

export const resetImageContainer = () => {
  return (dispatch) => {
    dispatch(resetImageContainerProp());
  };
};

export const setProductParentSku = (sku) => {
  return (dispatch) => {
    dispatch(setParentSku(sku));
  };
};

export const getProductDetailSides = (sidesDessert, category, sku) => {
  return (dispatch) => {
    if (category === 'Rice') {
      dispatch(fetchingDetailSides(true));
      let url = `${Config.url}getDetailSideAndDesserts`;
      axios.get(url, {
        params: {
          sku: sku
        },
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': Config.Accept,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }).then( response => {
        let sidesDetail = {};
        if(!_.isEmpty(response.data.data)) {
          sidesDetail = response.data.data;
          let productDetailArray = prepareProductDetailArray(sidesDetail.options, 'sides');
          dispatch(setProductDetailArray(productDetailArray));
          dispatch(fetchingDetailSides(false));
          dispatch(receivedDetailSides(sidesDetail));
        }
      }).catch( error => {
        dispatch(errorDetailSides(true));
      });
    }
    dispatch(setProductCategory(category));
    dispatch(setProductDetailSides(sidesDessert));
    dispatch(setProductIdForPixel(sidesDessert.id));
    dispatch(setPixelViewContentValue(sidesDessert.price));
  };
};

export const getProductDetailBeverage = (beverage) => {
  return (dispatch) => {
    dispatch(setProductDetailBeverage(beverage));
    dispatch(setProductIdForPixel(beverage.id));
    dispatch(setPixelViewContentValue(beverage.price));
  };
};

export const resetProductDetailProps = () => {
  return (dispatch) => {
    dispatch(resetAllProps());
  }
}

// get all topping detail from database
export const fetchTopingList = () => {
  return (dispatch) => {
    let url = `${Config.url}getpizzatoppings`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      if(response.data.data.length > 0) {
        let toppingsList = {};
        response.data.data.map((topping) => {
          toppingsList[topping.opt_code.toLowerCase()] = topping;
        });
        saveLocalStorage('toppingsList', toppingsList);
      }
    }).catch( error => {
      console.log('err in fetch topping list ', error);
    });
  }
}

// need to use fetch topping List here
export const fetchAllTopings = (defaultToppings, title, status = '') => {
  return (dispatch) => {
    let defaultToppingsArray = [];
    let toppingsNameDetail = [];
    toppingsNameDetail = defaultToppings;
    dispatch(fetchingTopingDetail(true));
    dispatch(setToppingTitle(title));
    let url = `${Config.url}getpizzatoppings`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let toppings = [];
      let count = 1;
      if(response.data.data.length > 0) {
        toppings = response.data.data;
      }
      let itemArray = [];
      let toppingDetail = {};
      toppingsNameDetail.map((toppingName) => {
        toppings.map((item, index) => {
          if(toppingName.code.toLowerCase() === item.opt_code.toLowerCase()) {
            toppingDetail = {
              image: item.image,
              code: item.opt_code,
              name: item.opt_name_en,
              count: 1
            };
            defaultToppingsArray.push(toppingDetail);
            itemArray.push(item.opt_code);
          }
        item.count = count;
        })
      });
      if (status !== false) {
        dispatch(settingDefaultToppings(defaultToppingsArray));
        dispatch(settingDefaultPersonalToppings(defaultToppingsArray));
      }
      dispatch(fetchingTopingDetail(false));
      dispatch(receivedTopingDetail(toppings));
    }).catch( error => {
      dispatch(errorToppingDetail(true));
      dispatch(fetchingTopingDetail(false));
    });
  }
}

export const setUpdatedToppings = (toppings, size) => {
  return (dispatch) => {
    if (size === 'Personal') {
      dispatch(settingDefaultPersonalToppings(toppings));
    } else {
      dispatch(settingDefaultToppings(toppings));
    }
  }
}

export const setUpdatedPrice = (updatedPrice) => {
  return (dispatch) => {
    dispatch(settingUpdatedPrice(updatedPrice));
  }
}

export const resetProps = () => {
  return (dispatch) => {
    dispatch(resetAllProps());
  }
}

export const setProductId = (productId) => {
  return (dispatch) => {
    dispatch(setProductIdForPixel(productId));
  }
}

export const resetPropsOnAddToCart = () => {
  return (dispatch) => {
    dispatch(setPropsOnAddToCart());
  }
}

export const actions = {
  getProductDetailPromotions,
  getProductDetailValueDeals,
  getProductDetailPizza,
  setSectionDetail,
  setColapsestate,
  setQuantity,
  resetPizzaContainer,
  resetImageContainer,
  getProductDetailSides,
  getProductDetailBeverage,
  resetProductDetailProps,
  fetchAllTopings,
  resetProps,
  fetchTopingList
};

export const resetAlertBox = (showAlert, message) => {
  return (dispatch) => {
    dispatch(setAlertMeassage(showAlert, message));
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCHING_DETAIL_PROMOTION]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_DETAIL_PROMOTION]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      promotionDetail: action.promotionDetail,
      sortedPromotionDetail: action.sortedPromotionDetail,
    };
  },
  [FETCHING_DETAIL_VALUE_DEALS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_DETAIL_VALUE_DEALS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      valueDetail: action.valueDetail,
    };
  },
  [FETCHING_DETAIL_PIZZA]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_DETAIL_PIZZA]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
      pizzaDetail: action.pizzaDetail,
    };
  },
  [SET_FILTER_PROMOTION_LIST]: (state, action) => {
    return {
      ...state,
      promotionProductList: action.promotionProductList,
    };
  },
  [SELECTED_PRODUCT_SIZE]: (state, action) => {
    return {
      ...state,
      selectedProductSize: action.selectedProductSize,
    };
  },
  [SET_SORTED_PROMOTION_ARRAY]: (state, action) => {
    return {
      ...state,
      sortedPromotionArray: action.sortedPromotionArray,
    };
  },
  [SET_COLAPSE_STATE]: (state, action) => {
    return {
      ...state,
      colapseClassName: action.colapseClassName,
    };
  },
  [SET_QUANTITY]: (state, action) => {
    return {
      ...state,
      quantity: action.quantity,
    };
  },
  [RESET_PIZZA_CONTAINER]: (state, action) => {
    return {
      ...state,
      size: action.size,
      crust: action.crust,
      promotionProductList: action.promotionProductList,
      valueDealsProductList: action.valueDealsProductList,
      pizzaProductList: action.pizzaProductList,
      sortedPromotionArray: action.sortedPromotionArray,
    };
  },
  [RESET_IMAGE_CONTAINER]: (state, action) => {
    return {
      ...state,
      productBeverageDetail: action.productBeverageDetail,
    };
  },
  [SET_VALUE_DEALS_LIST]: (state, action) => {
    return {
      ...state,
      valueDealsProductList: action.valueDealsProductList
    };
  },
  [SET_SORTED_VALUE_DEALS_ARRAY]: (state, action) => {
    return {
      ...state,
      sortedValueDealsArray: action.sortedValueDealsArray
    };
  },
  [SET_PRODUCT_DETAIL_ARRAY]: (state, action) => {
    return {
      ...state,
      productDetailArray: action.productDetailArray
    };
  },
  [SET_OTHER_THUMBNAIL]: (state, action) => {
    return {
      ...state,
      otherThumbnail: action.otherThumbnail
    };
  },
  [SET_SIDES_DESSERT_DETAIL]: (state, action) => {
    return {
      ...state,
      productSidesDetail: action.productSidesDetail
    };
  },
  [SET_BEVERAGE_DETAIL]: (state, action) => {
    return {
      ...state,
      productBeverageDetail: action.productBeverageDetail
    };
  },
  [SET_FILTER_PIZZA_LIST]: (state, action) => {
    return {
      ...state,
      pizzaProductList: action.pizzaProductList
    };
  },
  [SET_SORTED_PIZZA_ARRAY]: (state, action) => {
    return {
      ...state,
      sortedPizzaArray: action.sortedPizzaArray
    };
  },
  [SET_TOPPING_TITLE]: (state, action) => {
    return {
      ...state,
      toppingTitle: action.toppingTitle
    };
  },
  [SET_DEFAULT_ATTRIBUTES]: (state, action) => {
    return {
      ...state,
      size: action.size,
      crust: action.crust,
      thumbnail: action.thumbnail,
      description: action.description,
      sku: action.sku,
      price: action.price,
      crust_image: action.crust_image,
      defaultCrust: action.defaultCrust,
      defaultSize: action.defaultSize,
      default_topping: action.default_topping,
      sectionBasedCrustArray: action.sectionBasedCrustArray,
      sectionBasedProductArray: action.sectionBasedProductArray,
    };
  },
  [RESET_ALL_PROPS]: (state, action) => {
    return {
      ...state,
      size: action.size,
      crust: action.crust,
      promotionProductList: action.promotionProductList,
      valueDealsProductList: action.valueDealsProductList,
      pizzaProductList: action.pizzaProductList,
      productBeverageDetail: action.productBeverageDetail,
      productSidesDetail: action.productSidesDetail,
      quantity: action.quantity,
      productDetailArray: action.productDetailArray,
      defaultToppings: action.defaultToppings,
      defaultPersonalToppings: action.defaultPersonalToppings,
      allToppings: action.allToppings,
      updatedPrice: action.updatedPrice,
      isToppingSet: action.isToppingSet,
      pixelViewContentValue: action.pixelViewContentValue,
      productId: action.productId,
      chicken: action.chicken,
      sauce: action.sauce,
      defaultSideProduct: action.defaultSideProduct,
    };
  },
  [FETCHING_TOPPING_DETAIL]: (state, action) => {
    return {
      ...state,
      topFetching: action.topFetching
    };
  },
  [RECEIVED_TOPING_DETAIL]: (state, action) => {
    return {
      ...state,
      allToppings: action.allToppings,
    };
  },
  [SET_DEFAULT_TOPPINGS]: (state, action) => {
    return {
      ...state,
      defaultToppings: action.defaultToppings,
    };
  },
  [SET_DEFAULT_PERSONAL_TOPPINGS]: (state, action) => {
    return {
      ...state,
      defaultPersonalToppings: action.defaultPersonalToppings,
    };
  },
  [SET_PARENT_SKU]: (state, action) => {
    return {
      ...state,
      parentSku: action.parentSku,
    };
  },
  [SETTING_UPDATED_PRICE]: (state, action) => {
    return {
      ...state,
      updatedPrice: action.updatedPrice,
    };
  },
  [SETTING_TOPPING_STATUS]: (state, action) => {
    return {
      ...state,
      isToppingSet: action.isToppingSet,
    };
  },
  [ERROR_TOPPING_DETAIL]: (state, action) => {
    return {
      ...state,
      topError: action.topError,
    };
  },
  [ERROR_DETAIL_PROMOTION]: errorDetailPromotion,
  [ERROR_DETAIL_VALUE_DEALS]: errorDetailValueDeals,
  [ERROR_DETAIL_PIZZA]: errorDetailPizza,
  [SELECTED_PRODUCT_CRUST]: (state, action) => {
    return {
      ...state,
      selectedProductCrust: action.selectedProductCrust,
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  },
  [SET_PIXE_VIEW_CONTENT_VALUE]: (state, action) => {
    return {
      ...state,
      pixelViewContentValue: action.pixelViewContentValue,
    };
  },
  [SET_PRODUCT_ID_FOR_PIXEL]: (state, action) => {
    return {
      ...state,
      productId: action.productId,
    };
  },
  [SET_PROPS_ON_ADD_TO_CART]: (state, action) => {
    return {
      ...state,
      updatedPrice: action.updatedPrice,
      defaultToppings: action.defaultToppings,
      defaultPersonalToppings: action.defaultPersonalToppings,
      allToppings: action.allToppings,
    };
  },
  [FETCHING_PRODUCT_PRICE]: (state, action) => {
    return {
      ...state,
      fetchingPrice: action.fetchingPrice,
    }
  },
  [FETCHING_DETAIL_SIDES]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching,
    };
  },
  [RECEIVED_DETAIL_SIDES]: (state, action) => {
    return {
      ...state,
      sidesDetail: action.sidesDetail,
    };
  },
  [ERROR_DETAIL_SIDES]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },
  [SET_PRODUCT_CATEGORY]: (state, action) => {
    return {
      ...state,
      childProductCategory: action.childProductCategory,
    };
  },
  [SET_DEFAULT_ATTRIBUTES_FOR_SIDE_AND_DESSERT]: (state, action) => {
    return {
      ...state,
      size: action.size,
      chicken: action.chicken,
      sauce: action.sauce,
      defaultSideProduct: action.defaultSideProduct,
    };
  },
  [SET_SIDE_CHICKEN_PRODUCT]: (state, action) => {
    return {
      ...state,
      selectedChicken: action.selectedChicken,
      selectedSauce: action.selectedSauce,
      selectedSize: action.selectedSize,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  topFetching: false,
  topError: false,
  allToppings: [],
  defaultToppings: [],
  defaultPersonalToppings: [],
  fetching: false,
  error: false,
  pizzaDetail: {},
  promotionDetail: {},
  sortedPromotionDetail: [],
  valueDetail: {},
  promotionProductList: [],
  sortedPromotionArray: [],
  size: [],
  crust: [],
  sectionBasedCrustArray: [],
  sectionBasedProductArray: {},
  thumbnail: '',
  description: '',
  colapseClassName: '',
  quantity: 1,
  valueDealsProductList: [],
  sortedValueDealsArray: [],
  productDetailArray: [],
  productSidesDetail: [],
  productBeverageDetail: [],
  pizzaProductList: [],
  sortedPizzaArray: [],
  sku: '',
  price: '',
  crust_image: '',
  defaultCrust: '',
  defaultSize: '',
  selectedProductSize: '',
  default_topping: [],
  toppingTitle: '',
  selectedProductCrust: '',
  showAlert: false,
  alertMessage: "",
  parentSku: '',
  updatedPrice: 0,
  isToppingSet: false,
  pixelViewContentValue: 0,
  productId: '',
  fetchingPrice: false,
  childProductCategory: '',
  chicken: [],
  sauce: [],
  defaultSideProduct: {},
  sidesDetail: {},
  selectedChicken: '',
  selectedSauce: '',
  selectedSize: '',
};

export default function productReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
