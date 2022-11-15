import axios from 'axios';

import { saveSessionStorage, getSessionStorage, saveLocalStorage, getLocalStorage, preparedDataForCart, preparePlaceOrderCart, validateToppings, checkForSamePromotion, checkForSameValueDeals, trackAddsWithFacebookPixel, prepareAddToCartPixelData } from '../components/Helpers';
import { fetchUser } from './user';
import { initializeApp } from './app';
import { formatPrice, getPrice } from '../lib/Util';
import { Config, Tax } from 'config/Config';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const SET_DEFAULT_CART = 'SET_DEFAULT_CART';
export const SET_DEFAULT_SESSION_CART = 'SET_DEFAULT_SESSION_CART';
export const SET_SHAKE_STATE = 'SET_SHAKE_STATE';
export const CART_ADD_PROCESSING = 'CART_ADD_PROCESSING';
export const CART_ADD_PROCESSED = 'CART_ADD_PROCESSED';
export const CART_ADD_FAILURE = 'CART_ADD_FAILURE';
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const FETCHING_RESULT = "FETCHING_RESULT";
export const APPLIED_VOUCHER_CODE = "APPLIED_VOUCHER_CODE";
export const FAILED_VOUCHER_CODE = "FAILED_VOUCHER_CODE";
export const COUPON_PRODUCT_DETAIL = "COUPON_PRODUCT_DETAIL";
export const GET_CART_ITEMS = "GET_CART_ITEMS";

// ------------------------------------
// Actions
// ------------------------------------
export function getCartItem (status,response) {
  return {
  type : GET_CART_ITEMS,
  processing: status,
  cartItems: response
  };
}

export function setDefaultItemInCart(status, product) {
  return {
    type: SET_DEFAULT_CART,
    processing: status,
    cartProduct: product
  };
}

export function updateCartItem(status) {
  return {
    type: UPDATE_CART_ITEM,
    processing: status
  };
}

export function deleteCartItem(status) {
  return {
    type: DELETE_CART_ITEM,
    processing: status
  };
}

export function setDefaultSessionCart(status, product) {
  return {
    type: SET_DEFAULT_SESSION_CART,
    processing: status,
    cartProduct: product
  };
}

export function setShakeState(status) {
  return {
    type: SET_SHAKE_STATE,
    isShakeCartIcon: status
  };
}

export function cartAddProcessing(status) {
  return {
    type: CART_ADD_PROCESSING,
    processing: status
  };
}

export function cartAddProcessed(response) {
  return {
    type: CART_ADD_PROCESSED,
    addCartDetail: response
  };
}

export function cartAddFailure(status) {
  return {
    type: CART_ADD_FAILURE,
    failure: status
  };
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

export function fetchingResult(status) {
  return {
    type: FETCHING_RESULT,
    applying: status,
  };
}

export function appliedVoucherCode(response) {
  return {
    type: APPLIED_VOUCHER_CODE,
    voucherCodeDetail: response,
  };
}

export function failedVoucherCode(status) {
  return {
    type: FAILED_VOUCHER_CODE,
    error: status,
  };
}

export function setCouponProduct(product) {
  return {
    type: COUPON_PRODUCT_DETAIL,
    couponProduct: product,
  };
}

// ------------------------------------
// Actions creators
// ------------------------------------

const login = getLocalStorage('receivedLoginDetail');
  if (typeof login.customer_id !== 'undefined' && login.customer_id !== '') {
    var customer_id = login.customer_id;
    }
export const getCartItems = (customer_id) => {
  return (dispatch) => {
     let url = `${Config.url}getCartItems`;
      axios.get(url, {
        params: {
          customer_id: customer_id
        },
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': Config.Accept,
          'Access-Control-Allow-Origin': '*',
        }
      }).then( response => {
        if(response !== undefined) {
          let cartItems = response.data.data.items;
          cartItems.map((items) => {
            let item_id = items.item_id;
            dispatch(deleteCartAPI(item_id, customer_id));
          });
        }
      }).catch( error => {
        console.log(error);
      });
  }
}

export const setDefaultCart = (productIndex, product) => {
  return (dispatch) => {
    dispatch(setDefaultItemInCart(true));
    let productSKUId = Object.keys(product);
    if (productSKUId.length > 0) {
      // formatting price
      product[productSKUId[0]].price = formatPrice(product[productSKUId[0]].price);
      // remove topping - if topping list does not return topping name then remove it (it means that topping is diabled)
      if (typeof product[productSKUId[0]].topping !== 'undefined' && product[productSKUId[0]].topping.length > 0) {
        let filterTopping = [];
        product[productSKUId[0]].topping.map((topping) => {
          if (typeof topping.name !== 'undefined' && topping.name !== '') {
            filterTopping.push(topping);
          }
        });
        product[productSKUId[0]].topping = filterTopping;
      }
      saveSessionStorage('cart', product);
    }
    dispatch(setDefaultItemInCart(false, product));
  };
};

export const updateDefaultSessionCart = (item) => {
  const attributes = Object.keys(item);
  let cart = getSessionStorage('cart');
  return (dispatch) => {
    dispatch(setDefaultSessionCart(true));
    attributes.map ((attribute) => {
      if (typeof cart[Object.keys(cart)[0]] !== 'undefined') {
        cart[Object.keys(cart)[0]][attribute] = item[attribute];
      }
    });
    // remove topping - if topping list does not return topping name then remove it (it means that topping is diabled)
    if (typeof cart[Object.keys(cart)[0]].topping !== 'undefined' && cart[Object.keys(cart)[0]].topping.length > 0) {
      let filterTopping = [];
      cart[Object.keys(cart)[0]].topping.map((topping) => {
        if (topping !== null && typeof topping.name !== 'undefined' && topping.name !== '') {
          filterTopping.push(topping);
        }
      });
      cart[Object.keys(cart)[0]].topping = filterTopping;
    }
    saveSessionStorage('cart', cart);
    cart = getSessionStorage('cart');
  }
}

/*
* cart is updating based on product sku
*/
export const updateCart = (itemIndex, cartSku, item) => {
  return async (dispatch, getState) => {
    dispatch(cartAddProcessing(true));
    dispatch(updateCartItem(true));
    dispatch(fetchUser());
    const user = getState().user.user;
    let cart = (typeof user.cart !== 'undefined') ? user.cart : {};
    if (typeof cart[itemIndex] !== 'undefined' && typeof cart[itemIndex][cartSku] !== 'undefined') {
      Object.keys(cart[itemIndex][cartSku]).map((attribute) => {
        // update item price if qty updates
        if (attribute === 'qty') {
          let singleItemPrice = getPrice(cart[itemIndex][cartSku].price, cart[itemIndex][cartSku].qty, 'divide');
          cart[itemIndex][cartSku]['price'] = getPrice(singleItemPrice, item[attribute], 'multiply');
        }
        // update cart item
        if (typeof item[attribute] !== 'undefined') {
          cart[itemIndex][cartSku][attribute] = item[attribute];
        }
      });
    }

    const login = getLocalStorage('receivedLoginDetail');
    if (typeof login.customer_id !== 'undefined' && login.customer_id !== '') {
      await updateCartApi(cartSku, login.customer_id, item);
    }
    saveLocalStorage('cart', cart);
    dispatch(fetchUser());
    dispatch(cartAddProcessing(false));
    dispatch(updateCartItem(false));
  };
};

export const updateCartApi = (cartSku, customer_id, item) => {
  return new Promise((resolve) => {
    let userCart = getLocalStorage('cart');
    let cartItemId = '';
    userCart.map((cartItem) => {
      if (Object.keys(cartItem)[0] === cartSku) {
        cartItemId = cartItem[Object.keys(cartItem)].item_id;
      }
    })
    let url = `${Config.url}updateCartItem`
    let updateCart = new FormData();
    updateCart.append('customer_id', customer_id);
    updateCart.append('item_id', cartItemId);
    updateCart.append('qty', item.qty);
    axios({
      method: 'post',
      url: url,
      timeout: 100000,
      data: updateCart,
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (typeof response.data !== 'undefined' && typeof response.data.data !== 'undefined') {
        resolve(true);
      }
    }).catch(error => {
      resolve(true);
    });
  });
}

export const saveCart = (container, productId, productSku) => {
  return async (dispatch, getState) => {
    dispatch(cartAddProcessing(true));
    let pixelData = {};
    let cart = [];
    let sessionCart = getSessionStorage('cart');
    let addedItem = getLocalStorage('cart');
    let sessionItemKeys = Object.keys(sessionCart);
    let pixelProductSku = productSku;
    if (Array.isArray(sessionItemKeys) && sessionItemKeys.length > 0) {
      // add check on sku id
      const skuId = sessionItemKeys[0];
      let splitSessionCartSku = skuId.split('_');// 0-skuId, 1-category, 3-timestamp(if same product have different toppings)
      let sessionItemExistInCart = false;

      // on change quantity on product detail page - string type received
      if (typeof sessionCart[skuId] !== 'undefined' && typeof sessionCart[skuId].qty !== 'undefined'
        && typeof sessionCart[skuId].qty === 'string') {
        sessionCart[skuId].qty = parseInt(sessionCart[skuId].qty);
      }
      if (splitSessionCartSku[1] === 'promotion') {
        let options = {};
        const additionalInfoOption = sessionCart[skuId].additionalInfo;
        Object.keys(additionalInfoOption).map((child) => {
          options[additionalInfoOption[child].option_id] = additionalInfoOption[child].sku;
        });
        let price = await getProductPrice(splitSessionCartSku[0], options);
        if (price > 0) {
          sessionCart[skuId].price =  price * sessionCart[skuId].qty;
        }
      }
      sessionCart[skuId].modificationTime = new Date().getTime();
      let isSameTopping = false;
      let sameSKuExistInCart = false;
      if (addedItem !== null && addedItem.length > 0) {
        addedItem.map(item => {
          if (sessionItemExistInCart === false) {
            // update qty and price if session item already exist in cart
            let localStorageCartSku = Object.keys(item)[0];
            let splitCartSku = localStorageCartSku.split('_');
            /*
             *  Here we are spliting the sku of pizza and on 1st position we will get the product category.
             *  If category is pizza then we check is session cart sku is matched with the sku of cart(Local storage cart)
             *  If matched then we invoke a method validateToppings that will return if pizza is havinf the updated toppings
             *  or not and if pizza is having the updated toppings then make it a new product.
             *  If it is not a new product then update the existing product quantity and push the product in to the cart.
             */
            if (splitSessionCartSku[1] === 'pizza') {
              if (splitSessionCartSku[0] === splitCartSku[0]) {
                /*
                 *  This method is used to determine whether the product is the updated product or not based on the
                 *  toppings comparision
                 */
                isSameTopping = validateToppings(item[localStorageCartSku].topping, sessionCart[skuId].topping);
                if (isSameTopping === true) {
                  item[localStorageCartSku].price = getPrice(item[localStorageCartSku].price, sessionCart[skuId].price, 'add');
                  item[localStorageCartSku].qty += sessionCart[skuId].qty;
                  item[localStorageCartSku].modificationTime = new Date().getTime();
                  sessionItemExistInCart = isSameTopping;
                  sameSKuExistInCart = false;
                } else {
                  sameSKuExistInCart = true;
                }
              }
            } else if (splitSessionCartSku[1] === 'promotion') {
              if (splitSessionCartSku[0] === splitCartSku[0]) {
                /*
                 * This method is used to determine whether use selected same combination as in cart or different.
                 * If different then add it as new product in cart
                 */
                isSameTopping = checkForSamePromotion(sessionCart[skuId], item[localStorageCartSku]);
                if (isSameTopping === true) {
                  item[localStorageCartSku].price = getPrice(item[localStorageCartSku].price, sessionCart[skuId].price, 'add');
                  item[localStorageCartSku].qty += sessionCart[skuId].qty;
                  sessionItemExistInCart = isSameTopping;
                  item[localStorageCartSku].modificationTime = new Date().getTime();
                  sameSKuExistInCart = false;
                } else {
                  sameSKuExistInCart = true;
                }
              }
            } else if (splitSessionCartSku[1] === 'valueDeals') {
              if (splitSessionCartSku[0] === splitCartSku[0]) {
                /*
                 * This method is used to determine whether use selected same combination as in cart or different.
                 * If different then add it as new product in cart
                 */
                let isSameVD = checkForSameValueDeals(sessionCart[skuId], item[localStorageCartSku]);
                if (isSameVD === true) {
                  item[localStorageCartSku].price = getPrice(item[localStorageCartSku].price, sessionCart[skuId].price, 'add');
                  item[localStorageCartSku].qty += sessionCart[skuId].qty;
                  sessionItemExistInCart = isSameVD;
                  item[localStorageCartSku].modificationTime = new Date().getTime();
                  sameSKuExistInCart = false;
                } else {
                  sameSKuExistInCart = true;
                }
              }
            } else if ( typeof item[skuId] !== 'undefined' ) {
              // This condition will run if category is not `pizza`
              // on change quantity on product detail page - string type received
              if (typeof sessionCart[skuId].qty !== 'undefined' && typeof sessionCart[skuId].qty === 'string') {
                sessionCart[skuId].qty = parseInt(sessionCart[skuId].qty);
              }
              item[skuId].price = getPrice(item[skuId].price, sessionCart[skuId].price, 'add');
              item[skuId].qty += sessionCart[skuId].qty;
              item[skuId].modificationTime = new Date().getTime();
              sameSKuExistInCart = false;
              sessionItemExistInCart = true;
            }
          }
          cart.unshift(item);
        });
      }
      let preparedData = preparedDataForCart(sessionCart);
      if ( typeof preparedData.customer_id !== 'undefined' && typeof preparedData.customer_id !== undefined && preparedData.customer_id !== '') {
        // for login user
        let isCoupon = false;
        let couponCode = '';
        let couponDetail = getLocalStorage('couponDetail');
        if (couponDetail !== null && typeof couponDetail !== 'undefined' && typeof couponDetail.couponCode !== 'undefined' && couponDetail.couponCode !== '' && typeof couponDetail.isCoupon !== 'undefined' && couponDetail.isCoupon !== '') {
          isCoupon = couponDetail.isCoupon;
          couponCode = couponDetail.couponCode;
        }
        let url = `${Config.url}addCartItem`;
        let cartData = new FormData();
        cartData.append('customer_id', preparedData.customer_id);
        cartData.append('sku', preparedData.sku);
        cartData.append('qty', preparedData.qty);
        cartData.append('options', preparedData.options);
        if (isCoupon === true && couponCode !== '') {
          cartData.append('coupon_code', couponCode);
        }
        return new Promise((resolve) => {
          axios({
            method: 'post',
            url: url,
            timeout: 100000,
            data: cartData,
            headers: {'token': Config.token,
              'device-type': Config.devicetype,
              'Accept': Config.Accept,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            resolve(true);
            if (typeof response.data !== 'undefined' && typeof response.data.data !== 'undefined') {
              const sessionCartSku = skuId.split('_')[0];
              response.data.data.map((cartItem) => {
                if (cartItem.sku === sessionCartSku) {
                  sessionCart[skuId]['item_id'] = cartItem.item_id;
                }
              })
              /*
               *  If session cart item is not in cart then check same sku is in cart or not.
               *  If it is in cart then make a new sku by append a trailing timestamp and add item to cart
               *  After adding the product in cart with new sku delete the previous one.
               *  Finally push the item in to cart.
               */
              if (sessionItemExistInCart === false) {
                if (sameSKuExistInCart === true) {
                  let newSkuId = skuId + '_' + new Date().getTime();
                  pixelProductSku = newSkuId;
                  sessionCart[newSkuId] = sessionCart[skuId];
                  delete sessionCart[skuId];
                }
                cart.unshift(sessionCart);
              }
              dispatch(setShakeState(true));
              dispatch(cartAddProcessing(false));
              dispatch(cartAddProcessed(response.data));
              setTimeout(() => {
                dispatch(initializeApp())
                dispatch(setShakeState(false));
              }, 1000);
              // cart[0][skuId]['item_id'] = response.data.data[0].item_id;
              saveLocalStorage('cart', cart);
              pixelData = prepareAddToCartPixelData(Tax, productId, pixelProductSku);
              trackAddsWithFacebookPixel('AddToCart', pixelData);
            }
          }).catch(error => {
            resolve(true);
            dispatch(cartAddProcessing(false));
            dispatch(cartAddFailure(true));
            dispatch(setAlertMeassage(true, error.response.data.message));
          });
        });
      } else {
        // for guest user
        /*
         *  Same for the guest user. if the session item is not there in cart then check the session cart sku with cart sku
         *  If it matched then create a new timestamp with the current timestamp and add a product in to cart.
         *  Make sure to delete the product having the session cart sku as we have done in login user case.
         */
        if (sessionItemExistInCart === false) {
          if (sameSKuExistInCart === true) {
            let newSkuId = skuId + '_' + new Date().getTime();
            pixelProductSku = newSkuId;
            sessionCart[newSkuId] = sessionCart[skuId];
            delete sessionCart[skuId];
          }
          cart.unshift(sessionCart);
        }
        saveLocalStorage('cart', cart);
        dispatch(initializeApp());
        dispatch(setShakeState(true));
        setTimeout(() => {
          dispatch(setShakeState(false));
        }, 1000);
        dispatch(cartAddProcessing(false));
      }
      pixelData = prepareAddToCartPixelData(Tax, productId, pixelProductSku);
      trackAddsWithFacebookPixel('AddToCart', pixelData);
    } else {
      console.log('add to cart - empty session item');
    }
  };
};

export const deleteCart = (itemIndex, cartSku) => {
  return async (dispatch, getState) => {
    dispatch(cartAddProcessing(true));
    dispatch(deleteCartItem(true));
    dispatch(fetchUser());
    const user = getState().user.user;
    let cart = (typeof user.cart !== 'undefined') ? user.cart : {};

    // delete cart item from server in case of logged in user
    const loginUserInfo = getLocalStorage('receivedLoginDetail');
    if (typeof loginUserInfo.customer_id !== 'undefined' && loginUserInfo.customer_id !== '') {
      if (typeof cart[itemIndex] !== 'undefined') {
        const item = Object.values(cart[itemIndex])[0];
        await deleteCartAPI(item.item_id, loginUserInfo.customer_id, dispatch);
      }
    }
    // delete cart item from local storage
    if (typeof cart[itemIndex] !== 'undefined') {
      cart.splice(itemIndex, 1);
    }
    let cartProductIds = getLocalStorage('productId');
    cartProductIds.map((item, index) => {
      if (item.productSku === cartSku) {
        cartProductIds.splice(index, 1);
        saveLocalStorage('productId', cartProductIds);
      }
    });
    saveLocalStorage('cart', cart);
    dispatch(fetchUser());
    dispatch(cartAddProcessing(false));
    dispatch(deleteCartItem(false));
  };
};

export const deleteCartAPI = (itemId, customerId, dispatch = null) => {
  return new Promise((resolve) => {
    let cartData = new FormData();
    cartData.append('item_id', itemId);
    cartData.append('customer_id', customerId);
    axios({
      method: 'post',
      url: `${Config.url}removeCartItem`,
      timeout: 100000,
      data: cartData,
      headers:{
        'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      resolve(true);
    }).catch(error => {
      resolve(true);
      dispatch(setAlertMeassage(true, error.response.data.message));
    });
  });
}

export const getProductPrice = (sku, option) => {
  let price = 0;
  let url = `${Config.url}getPrice`;
  let cartData = new FormData();
  cartData.append('sku', sku);
  cartData.append('options', JSON.stringify(option));
  cartData.append('qty', 1);
  cartData.append('withtax', 1);
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${Config.url}getPrice`,
      timeout: 100000,
      data: cartData,
      headers: {
        'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (typeof response.data.data.price !== 'undefined') {
        price = parseFloat(response.data.data.price);
      }
      resolve(price);
    }).catch(error => {
      resolve(price);
    });
  });
};


export const resetCartAlertBox = (showAlert, message) => {
  return (dispatch) => {
    dispatch(setAlertMeassage(showAlert, message));
  }
};

export const applyVoucherCode = (code) => {
  return (dispatch) => {
    dispatch(fetchingResult(true));
    let couponDetail = {};
    let user = getLocalStorage('user');
    let loginDetail = getLocalStorage('receivedLoginDetail');
    let url = `${Config.url}getProductByCouponCode`;
    return new Promise((resolve) => {
      if (loginDetail !== null && typeof loginDetail !== 'undefinde' && typeof loginDetail.customer_id !== 'undefinde' && loginDetail.customer_id !== '') {
        axios.get(url, {
          params: {
            coupon_code: code,
            email: user.email,
            customer_id: loginDetail.customer_id,
          },
          headers: {"token": Config.token,
            "device-type": Config.devicetype,
            "Accept": Config.Accept,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        }).then(response => {
          let sku = '';
          if (typeof response !== 'undefinde' && typeof response.data !== 'undefinde' && typeof response.data.data !== 'undefinde' && response.data.data.sku !== '') {
            sku = response.data.data.sku;
            dispatch(fetchingResult(false));
            dispatch(appliedVoucherCode(response.data.data));
            couponDetail.couponCode = sku;
            couponDetail.isCoupon = true;
            saveLocalStorage('couponDetail', couponDetail);
          }
          resolve(true);
        }).catch(error => {
          if (!error.response) {
            const message = translate('Not Found');
            dispatch(setAlertMeassage(true, message));
          }
          dispatch(fetchingResult(false));
          dispatch(failedVoucherCode(true));
          resolve(true);
        });
      } else {
        axios.get(url, {
          params: {
            coupon_code: code,
            email: user.email
          },
          headers: {"token": Config.token,
            "device-type": Config.devicetype,
            "Accept": Config.Accept,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        }).then(response => {
          let sku = '';
          if (typeof response !== 'undefinde' && typeof response.data !== 'undefinde' && typeof response.data.data !== 'undefinde' && response.data.data.sku !== '') {
            sku = response.data.data.sku;
            dispatch(fetchingResult(false));
            dispatch(appliedVoucherCode(response.data.data));
          }
          resolve(true);
        }).catch(error => {
          if (!error.response) {
            const message = translate('Not Found');
            dispatch(setAlertMeassage(true, message));
          }
          dispatch(fetchingResult(false));
          dispatch(failedVoucherCode(true));
          resolve(true);
        });
      }
    });
  }
};

export const getCouponProductDetail = (sku) => {
  return (dispatch) => {
    dispatch(fetchingResult(true));
    return new Promise((resolve) => {
      let url = `${Config.url}getDetailPromotions`;
      axios.get(url, {
        params: { sku: sku },
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': Config.Accept,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }).then( response => {
        let productDetail = {};
        if(typeof response.data !== 'undefined' && typeof response.data.data !== 'undefined') {
          productDetail = response.data.data;
          dispatch(fetchingResult(false));
        }
        dispatch(setCouponProduct(productDetail));
        resolve(true);
      }).catch( error => {
        dispatch(fetchingResult(false));
        resolve(true);
      });
    });
  };
};

export const actions = {
  updateCart,
  deleteCart,
  getProductPrice
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [GET_CART_ITEMS]: (state, action) => {
    return {
      ...state,
    cartItems: action.processing
    };
  },

  [SET_DEFAULT_CART]: (state, action) => {
    return {
      ...state,
      addItemProcessing: action.processing,
      cartProduct: action.cartProduct
    };
  },
  [UPDATE_CART_ITEM]: (state, action) => {
    return {
      ...state,
      updateItemProcessing: action.processing
    };
  },
  [DELETE_CART_ITEM]: (state, action) => {
    return {
      ...state,
      deleteItemProcessing: action.processing
    };
  },
  [SET_DEFAULT_SESSION_CART]: (state, action) => {
    return {
      ...state,
      cartProduct: action.cartProduct
    };
  },
  [SET_SHAKE_STATE]: (state, action) => {
    return {
      ...state,
      isShakeCartIcon: action.isShakeCartIcon,
    };
  },
  [CART_ADD_PROCESSING]: (state, action) => {
    return {
      ...state,
      processing: action.processing,
    };
  },
  [CART_ADD_PROCESSED]: (state, action) => {
    return {
      ...state,
      addCartDetail: action.addCartDetail,
    };
  },
  [CART_ADD_FAILURE]: (state, action) => {
    return {
      ...state,
      failure: action.failure,
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
      return {
          ...state,
          showAlert: action.showAlert,
          alertMessage: action.alertMessage
      };
  },
  [FETCHING_RESULT]: (state, action) => {
      return {
          ...state,
          applying: action.applying,
      };
  },
  [APPLIED_VOUCHER_CODE]: (state, action) => {
      return {
          ...state,
          voucherCodeDetail: action.voucherCodeDetail,
      };
  },
  [FAILED_VOUCHER_CODE]: (state, action) => {
      return {
          ...state,
          error: action.error,
      };
  },
  [COUPON_PRODUCT_DETAIL]: (state, action) => {
    return {
      ...state,
      couponProduct: action.couponProduct,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  addItemProcessing: false,
  updateItemProcessing: false,
  deleteItemProcessing: false,
  cartProduct: {},
  isShakeCartIcon: false,
  processing: false,
  failure: false,
  addCartDetail: {},
  showAlert: false,
  alertMessage: "",
  error: false,
  applying: false,
  voucherCodeDetail: [],
  couponProduct: {}
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
