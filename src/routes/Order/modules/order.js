import axios from 'axios';
import { browserHistory } from 'react-router';
import { Config, PaymentOption, Url } from '../../../config/Config';
import { saveLocalStorage, getLocalStorage, removeLocalStorage, getAllArchive,getSessionStorage, preparePlaceOrderCart, trackAddsWithFacebookPixel } from 'components/Helpers';
import { placingOrder } from '../../../store/newcart';
import { translate, filterTrackingCode, encodeUri, optimise,generateGuestAddress } from 'components/Helpers';
import moment from 'moment'
import { sha256, sha224 } from 'js-sha256'
import ReactGA from 'react-ga';
const utf8 = require('utf8');
ReactGA.initialize(Config.GoogleAnalyticsKey);
ReactGA.plugin.require('ecommerce');


// ------------------------------------
// Constants
// ------------------------------------
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_RESPONSE = 'PLACE_ORDER_RESPONSE';
export const SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE';
export const SET_PAYMENT_DETAIL = 'SET_PAYMENT_DETAIL';
export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';
export const STORE_TIME_DETAIL = 'STORE_TIME_DETAIL';
export const SET_PAYMENT_ONLINE = 'SET_PAYMENT_ONLINE';
export const SET_FAILED_PAYMENT_STATE = 'SET_FAILED_PAYMENT_STATE';
export const ONLINE_ORDER_RESPOSE = 'ONLINE_ORDER_RESPOSE';
export const FETCHING_STORE_LIST = 'FETTCHING_STORE_LIST';
export const RECEIVED_STORE_LIST = 'RECEIVED_STORE_LIST';
export const STORE_LIST_ERROR = 'STORE_LIST_ERROR';
// export const FETCH_TIMESTAMP = 'FETCH_TIMESTAMP';
// export const FETCHING_TIMESTAMP = 'FETCHING_TIMESTAMP';

// ------------------------------------
// Actions
// ------------------------------------

export function setPayment(status, paymentOption) {
  return {
    type: SET_PAYMENT_METHOD,
    paymentOption: paymentOption,
    setPayment: status,
  };
}

export function placeOrderRequest() {
  return {
    type: PLACE_ORDER_REQUEST,
    placingOrder: true
  };
}

export function placeOrderResponse() {
  return {
    type: PLACE_ORDER_RESPONSE,
    placingOrder: false
  };
}

export function setAlertMeassage(status, message) {
  return {
    type: SET_ALERT_MESSAGE,
    showAlert: status,
    alertMessage: message
  };
}

export function setLoginUserPayment(status) {
  return {
    type: SET_PAYMENT_DETAIL,
    savePayment: status
  };
}

export function setLoggedinUserOrderDetail(status) {
  return {
    type: SET_ORDER_DETAIL,
    saveOrderDetail: status
  };
}

export function setStoreTimeDetailData(data) {
  return {
    type: STORE_TIME_DETAIL,
    storeTimeDetailData : data
  };
}

export function getStoreList(data) {
  return {
    type: STORE_LIST,
    storeList: data
  }
}

export function setPaymentOnlineData(data) {
  return {
    type: SET_PAYMENT_ONLINE,
    paymentOnlineData : data
  };
}

export function onlineOrderResponseData(data) {
  return {
    type: ONLINE_ORDER_RESPOSE,
    onlineOrderResponseData : data
  };
}

export function setFailedPaymentState(status) {
  return {
    type: SET_FAILED_PAYMENT_STATE,
    isPgPaymentFailed : status
  };
}

export function fetchingStoreList(status) {
  return {
    type: FETCHING_STORE_LIST,
    fetching: status
  }
}

export function receivedStoreList(storeList) {
  return {
    type: RECEIVED_STORE_LIST,
    storeList: storeList
  }
}

export function storeListError(status) {
  return {
    type: STORE_LIST_ERROR,
    error: status
  }
}
// export function fetchingTimeStamp(status) {
//   return {
//     type: FETCHING_TIMESTAMP,
//     fetchingTimeStamp: status
//   }
// }

// export function receivedTimeStamp(timeStamp) {
//   return {
//     type: FETCH_TIMESTAMP,
//     timeStamp: timeStamp
//   }
// }



// ------------------------------------
// Action creators
// ------------------------------------

var danaUrl;

export const setPlaceOrder = (status) => {
  return (dispatch) => {
    dispatch(placingOrder(status));
  }
}

export const getStoreTime = (store_code,day) => {
  return (dispatch,getState) => {
    var store_code;
    const user = getState().user.user;
    if(user.order !== undefined) { 
      if (user.order.deliveryType === 'Delivery') {
        let storeDetail = getLocalStorage('storeDetail');
        store_code = storeDetail.trade_zone_id;
      }else {
        if(user.order.deliveryType === 'Carryout') {
        const storeDetail = getLocalStorage('store');getStoreTime
        store_code = storeDetail.trade_zone_id;
        }
      }
    }
    saveLocalStorage('store_code',store_code);
    let url = `${Config.url}getStoreOperationTime`;
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: {
          store_code: store_code,
          day : 1,
        },
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': 'application/json'
        }
      }).then( response => {
        saveLocalStorage('store_open',response.data.data.store_open);
        saveLocalStorage('store_close',response.data.data.store_close);
        dispatch(setStoreTimeDetailData(response));
        dispatch(fetchStoreList());
        resolve(true);
      }).catch( error => {
        resolve(true);
      });
    });  
  };
};

export const fetchStoreList = () => {
  return (dispatch) => {
    dispatch(fetchingTimeStamp(true));
    let url = `${Config.url}getStore`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let storeList = [];
      if(response.data.data.length > 0) {
        storeList = response.data.data;
        let store_code = getLocalStorage('store_code');
        let storeName;
        storeList.map((storeNames) => {
        if (store_code === storeNames.store_mapping_code) {
          storeName = storeNames.store_title_en;
          saveLocalStorage('storeName',storeName);   
        }
       });
      }
          dispatch(receivedStoreList(storeList));
      dispatch(fetchingStoreList(false));
    }).catch( error => {
      dispatch(storeListError(true));
      dispatch(fetchingStoreList(false))
    });
    
  }
}

// export const fetchTimeStamp = () => {
//   return (dispatch) => {
//     dispatch(fetchingStoreList(true));
//     let url = `${Config.url}getCurrentTimeStamp`;
//     axios.get(url, {
//       headers: {'token': Config.token,
//         'device-type': Config.devicetype,
//         'Accept': Config.Accept,
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//       }
//     }).then( response => {
//       let timeStamp=""
//           timeStamp = response.data.data.timestamp;
//         saveLocalStorage('timeStamp',timeStamp);
//         dispatch(receivedTimeStamp(timeStamp));
//       dispatch(fetchingTimeStamp(false));
//     }).catch( error => {
//       dispatch(fetchingTimeStamp(false))
//     });
//   }
// }


export const setPaymentOption = (paymentOption, action) => {
  return (dispatch) => {
    dispatch(setPayment(true));
    if (action === 'set') {
      saveLocalStorage('payment', {'option': paymentOption});
      saveLocalStorage('paymentMode', {'option': paymentOption});
    } else if (action === 'reset') {
      removeLocalStorage('payment');
     // removeLocalStorage('paymentMode');
    }
    dispatch(setPayment(false, paymentOption));
  };
};

export const placeOrder = (placeOrderData) => {

  return (dispatch, getState) => {
    dispatch(placeOrderRequest());
    dispatch(setPlaceOrder(true))
    const user = getState().user.user;
    const userInfo = getLocalStorage('user');
    const userAddress = getLocalStorage('deliveryAddress');
    const payment = getLocalStorage('payment');
    const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    const cart = getLocalStorage("cart")
    let order = getLocalStorage('order');
    let login = getLocalStorage('receivedLoginDetail');
    let uniqueKey = JSON.parse(localStorage.getItem("cartItems"))
    // let tax = getLocalStorage("tax")
    // calculate delivery type
    let paymentCode = '';
    if (typeof payment === 'undefined') {
      dispatch( setAlertMeassage(true, translate("Please select payment option")));
    } else {
      paymentCode = PaymentOption[payment.option];
    }
    const storeDetail = getLocalStorage('store');
    let deliveryType = '';
    let storeCode = '';
    let storeName = '';
    let additionalInstruction = '';
    let deliveryTime = 'now';
    let membership = 'new';
    let address = {
      latitude: 0.0,
      longitude: 0.0,
      floor: '',
      substreet: '',
      type: '',
      place: '',
      tower: '',
      kav: '',
      street:'',
      city:'',
      region:'',
      postal_code:'',
      survey_address_id: '',
      address:''
    }
    let data = {};
    additionalInstruction = getLocalStorage("additionalInstruction") 
    if (typeof user.order !== 'undefined') {
      if (typeof user.order.additional_instruction !== 'undefined' ) {
        additionalInstruction =  (typeof additionalInstruction !== 'undefined') ? additionalInstruction : '';
      } else {
        additionalInstruction = (typeof additionalInstruction !== 'undefined') ? additionalInstruction : '';
      }
      // set advance order time
      if (typeof user.order.advanceOrder !== 'undefined' && user.order.advanceOrder === true
        && typeof user.order.orderDate !== 'undefined' && user.order.orderDate !== 'now') {
        const splitOrderDate = user.order.orderDate.split(' ');
        
        const splitDate = splitOrderDate[0].split('-');
        
        const splitTime = splitOrderDate[1].split(':');
       
        deliveryTime = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitTime[0]}:${splitTime[1]}`;
      }

      if (user.order.deliveryType === 'Delivery') {
        deliveryType = 'delivery_delivery';
        const storeDetail = getLocalStorage('storeDetail');
        address.latitude = storeDetail.latitude;
        address.longitude = storeDetail.longitude;
        storeCode = storeDetail.trade_zone_id;
        storeName = storeDetail.trade_zone_address.building_name;
        address.survey_address_id = '';
        if (typeof userAddress.address !== 'undefined') {
          address.floor = userInfo.address.floor;
          address.substreet = userInfo.address.substreet;
          address.type = userInfo.address.type;
          address.tower = userInfo.address.tower;
          address.kav = userInfo.address.kavnumber;
          address.place = userInfo.address.unit;
        }
      } else if (user.order.deliveryType === 'Carryout') {
        deliveryType = 'carryout_carryout';
        const storeDetail = getLocalStorage('store');
        storeCode = storeDetail.StoreCode;
        storeName = storeDetail.AddressLine1;
      }
    } else {
      dispatch(setAlertMeassage(true, translate("Please select delivery method")));
    }

    let choosenAddress = generateGuestAddress();
    let place = ""
    address.floor = address.floor === '' ? choosenAddress.floor  : address.floor;
    address.substreet = address.substreet === '' ? choosenAddress.substreet  : address.substreet;
    address.type = address.type === '' ? choosenAddress.type  : address.type;
    address.tower = address.tower === '' ? choosenAddress.tower  : address.tower;
    address.kav = address.kav === '' ? choosenAddress.kavnumber  : address.kav; 
    address.street = choosenAddress.street;
    address.city = choosenAddress.region;
    address.region = choosenAddress.region;
    address.postal_code = choosenAddress.postal_code;
    place = choosenAddress.address
    

    if (typeof login.customer_id !== 'undefined' && login.customer_id !== '') {
      const deliveryAddress = getLocalStorage('delivery_address');
      address.street = deliveryAddress.street;
      address.city = deliveryAddress.region;
      address.region = deliveryAddress.region;
      address.postal_code = deliveryAddress.postcode;
      place = deliveryAddress.place
    }

    
    let affiliateInformation = getLocalStorage('affiliateInformation');
    // if (typeof login.customer_id !== 'undefined' && login.customer_id !== '') {
    //   membership = 'existing';
    //   data = { 
    //     'customer_id':login.customer_id,
    //     'mobile': 1, // need to check  dynamically
    //     'fav_order':order.favouriteOrder,
    //     'payment_code':paymentCode,
    //     'delivery_time':deliveryTime,
    //     'remarks': additionalInstruction,
    //     'affiliate_vendor': (!_.isEmpty(affiliateInformation) && affiliateInformation.isOrderFromAffiliate === true) ? affiliateInformation.affiliateSource : '',
    //     'deeplink_url': `${Config.app_url}dana-response`
    //   }
    // } else {
      let placeOrderCart = preparePlaceOrderCart(cartItems);
      let newMoment = moment().unix()
      let email = userInfo.email
      let uniqueId = newMoment+'_'+email
      let recaptchaToken =  getLocalStorage('recaptchaToken')
      let timeStamp = getLocalStorage('timeStamp')
      let salt = "050ed4095419a27bb9b8d6ef92b7c337"
      let checksum = userInfo.firstname + userInfo.lastname + userInfo.phoneNumber + userInfo.email + salt + timeStamp 
      let entity_id = getLocalStorage("entity_id")
      let convertToSha =  sha256(
        utf8.encode(checksum)
      )
     
      data = {
        'survey_address_id':address.survey_address_id,
        'mobile':1,
        'items':JSON.stringify(placeOrderCart),
        'service_method':deliveryType,
        "customer_id": login.customer_id,
        'store_code':storeCode,
        'firstname':userInfo.firstname,
        'lastname':userInfo.lastname,
        'email':userInfo.email,
        'contact_number':userInfo.phoneNumber,
        'contact_ext':userInfo.contact_ext,
        'contact_type':'m',
        'payment_code':paymentCode,
        'order_source':'pwa',
        'delivery_time':deliveryTime,
        'remarks': additionalInstruction,
        'longitude':address.longitude,
        'latitude':address.latitude,
        'floor':address.floor,
        'substreet':address.substreet,
        'type':address.type,
        'fav_order':0,
        'address_id':entity_id,
        'place':address.place,
        'tower':address.tower,
        'unique_token':uniqueId,
        'kav':address.kav,
        'city': address.city,
        'region': address.region,
        'street': address.street,
        'post_code': address.postal_code,
        'recaptcha-response':recaptchaToken,
        'address': place,
        'checkSum': convertToSha,
        'timeStamp' : timeStamp,
        'affiliate_vendor': (!_.isEmpty(affiliateInformation) && affiliateInformation.isOrderFromAffiliate === true) ? affiliateInformation.affiliateSource : '',
        'deeplink_url': `${Config.app_url}dana-response`
      };
    //}
    
    let payload = new FormData();
    let keys = Object.keys(data);
    keys.map((item) => {
      payload.append(item, data[item]);
    });
    let placeOrderPromise = new Promise((resolve, reject) => {
      order.placeOrder = false;
      // var order_id;
      axios({
        method: 'post',
        url: `${Config.url}placeOrderNew/`,
        timeout: 100000,
        data: payload,
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': Config.Accept,
           'Access-Control-Allow-Origin': 'null',
          'Content-Type': 'multipart/form-data'
        }
      }).then(async (response)=> { 
       
        if(response.data.status === "failed"){
        
           saveLocalStorage("orderFailed",response.data.message)             
        dispatch(setPlaceOrder(false))
        } else{
           if (typeof response != 'undefined')  {
          order_id = response.data.data.order_id;
     
          saveLocalStorage('order_id',order_id);
          //make a call to api for snapbin(online payment)
          if(paymentCode === 'snapbin') {  
            var order_id = response.data.data.order_id;
            dispatch(postPlaceOrder(order, response, storeName, storeCode, membership,cartItems));
            dispatch(setPaymentOnline(order_id));
          } else if (paymentCode === 'snapmigs') {
            danaUrl = response.data.data.redirect_url;
            dispatch(postPlaceOrder(order, response, storeName, storeCode, membership,cartItems));
            await danaResponse();
          } else {
            dispatch(postPlaceOrder(order, response, storeName, storeCode, membership,cartItems));
          }
        }

        dispatch(placeOrderResponse());
        resolve(true);
        dispatch(setPlaceOrder(false))
        }
       
      }).catch(error => {
      console.log(error)
        dispatch(placeOrderResponse());
        reject(false);
        if (typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined' && typeof error.response.data.message !== 'undefined') {
          saveLocalStorage("orderFailed",error.response.data.message)
          browserHistory.push(Url.VIEW_CART);
          dispatch(setAlertMeassage(true, error.response.data.message));
          //window.location.reload();
        } else {
          saveLocalStorage("orderFailed","We are currently experiencing technical difficulty. Please try again later or call 1 500 366 to place an order.")
          browserHistory.push(Url.VIEW_CART);
          dispatch(setAlertMeassage(true, translate("We are currently experiencing technical difficulty. Please try again later or call 1 500 366 to place an order.")));
          //window.location.reload();
        }
        dispatch(setPlaceOrder(false))
      });
    });
    placeOrderPromise.then((placeOrder, response) => {
      console.log("placeOrder=====",placeOrder) 
      if (placeOrder === true && paymentCode!=='snapbin' && paymentCode!== 'snapmigs') {

        browserHistory.push(Url.THANK_YOU);
        console.log("response=====",response) 
        saveLocalStorage('orderConfirm', response.data.data);
        removeLocalStorage(['cartItems','cart', 'payment', 'price', 'productId']);
      }
    });
  };
};

export const postPlaceOrder = (order, response, storeName, storeCode, membership, cart) => {
  return (dispatch) => {
    let affiliateInformation = getLocalStorage('affiliateInformation');
    if (!_.isEmpty(affiliateInformation) && affiliateInformation.isOrderFromAffiliate === true) {
      let filteredTrackingCode = filterTrackingCode(response.data.data.tracking_code);
      let encodedStoreName = encodeUri(storeName);
      let orderedItems = {
        quantity : 0,
        amount: 0,
        tax : 0,
        delivery: 0,
        total: 0
      };
       let taxPrice = 0
    let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
       selectedProducts!==null && selectedProducts.map(item => {
          orderedItems.quantity = orderedItems.quantity + item.quantity
          orderedItems.amount = orderedItems.amount + (item.price*item.quantity)
          if(item.item.id === "DELVYFEE"){
            taxPrice=item.price
          }
      })

      let conversionPixelData = {
        trackingCode: filteredTrackingCode,
        storeCode: storeCode,
        storeName: encodedStoreName,
        membership: membership,
        amount: response.data.data.total,
         subTotal: orderedItems.amount,
         delivery:taxPrice
      }
      saveLocalStorage('conversionPixelData', conversionPixelData);
    }
    /*
     *  ========== End ==============
     */
    saveLocalStorage('orderConfirm', response.data.data);
    // const id = response.data.data.order_id;
    const id = getLocalStorage('order_id');
    if (typeof id !== 'undefined' && id !== '') {
      order.orderId = id;
      order.placeOrder = false;

      saveLocalStorage('order', order);
      try {
        /*
         *  calling facebook pixel
         *  we are sharing the user email, orderId, total and items.
         */
        const productIdCollection = getLocalStorage('productId');
        let contentIds = [];
        productIdCollection.map((item) => {
          contentIds.push(item.productId);
        });
        /*
         * Google tag manager
        */
        const tagManagerData = {
          event: 'Pageview',
          url: window.location.pathname,
          orderID: parseInt(response.data.data.order_id),
          revenue: response.data.data.total
        }
        saveLocalStorage('gtmdata', tagManagerData);

        const pixelData = {
          content_type: 'product',
          content_ids: contentIds,
          value: response.data.data.total,
          content_name: 'Order Confirmation',
          currency: 'IDR',
          orderId: response.data.data.order_id,
        }

        trackAddsWithFacebookPixel('Purchase', pixelData);
            
        let orderData = getLocalStorage('orderConfirm');
        let storeName = getLocalStorage('storeName');
        const eventData = {
          transaction_id: orderData.order_id,
          tracking_code: orderData.tracking_code,
          affiliate_vendor: 'NO',
          order_status: "success",
          store_name: storeName,
          revenue: orderData.total,
          currency: 'IDR',
        };
        // branch.logEvent (
        //   "PURCHASE",
        //   eventData,
        //   function(err) { console.log(err); }
        // );
        cart.map((orderItem) => {
          //let fullSku = (typeof orderItem[Object.keys(orderItem)] !== 'undefined' && typeof orderItem[Object.keys(orderItem)].sku !== 'undefined') ? orderItem[Object.keys(orderItem)].sku : '';
          let fullSku = orderItem.item.sku+"_"+orderItem.category
          ReactGA.plugin.execute(
            'ecommerce',
            'addItem',
            {
              'id': response.data.data.order_id,
              'sku': orderItem[fullSku].sku,
              'quantity': orderItem[fullSku].qty,
              'name': orderItem[fullSku].title,
              'price': orderItem[fullSku].price,
            }
          );
        });

        ReactGA.plugin.execute (
          'ecommerce',
          'addTransaction',
          {
            id: response.data.data.order_id,
            revenue: response.data.data.total
          }
        );
        ReactGA.plugin.execute('ecommerce', 'send');
        ReactGA.plugin.execute('ecommerce', 'clear');
        optimise(orderData.order_id );
       
      } catch(err) {  
      }
    } else if (typeof response.message !== 'undefined') {
      dispatch(setAlertMeassage(true, response.message));
    } else {
      dispatch(setAlertMeassage(true, translate("Sorry, we are currently experiencing technical difficulty. Please try again later or call 1 500 366 to place an order.")));
    }  
  }
}


export const setLoginUserPaymentMethod = () => {
  return (dispatch) => {
    const loginUserInfo = getLocalStorage('receivedLoginDetail');
    const payment = getLocalStorage('payment');
    // dispatch this action to show loading image
    dispatch(placeOrderRequest());
    if (typeof loginUserInfo.customer_id !== 'undefined' && loginUserInfo.customer_id !== '' &&
      typeof payment !== 'undefined' && typeof payment.option !== 'undefined') {
      const data = {
        customer_id: loginUserInfo.customer_id,
        payment_code: PaymentOption[payment.option],
        mobile: 1
      }
      let payload = new FormData();
      let keys = Object.keys(data);
      keys.map((item) => {
        payload.append(item, data[item]);
      });
      dispatch(setLoginUserPayment(true));
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${Config.url}setPaymentMethod`,
          timeout: 100000,
          data: payload,
          headers: {
            'token': Config.token,
            'device-type': Config.devicetype,
            'Accept': Config.Accept,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        }).then((response)=> {
          dispatch(setLoginUserPayment(false));
          resolve(true);
        }).catch(error => {
          dispatch(setLoginUserPayment(false));
          resolve(true);
        });
      });
    }
  };
}

export const setOrderDetail = (orderDetail) => {
  return (dispatch, getState) => {
    dispatch(setLoggedinUserOrderDetail(true));
    const user = getState().user.user;
    const userInfo = getLocalStorage('user');
    let order = getLocalStorage('order');
    const loginUserInfo = getLocalStorage('receivedLoginDetail');
    const additionalInstruction = getLocalStorage('additionalInstruction');
    if (typeof loginUserInfo.customer_id !== 'undefined' && loginUserInfo.customer_id !== '' ) {
      let orderDetail = {};
      let additionInstruction = '';
      let deliveryTime = 'now';
      if (typeof user.order !== 'undefined') {
        if (typeof additionalInstruction !== 'undefined' ) {
          additionInstruction = additionalInstruction;
        }
        // set advance order time
        if (typeof user.order.advanceOrder !== 'undefined' && user.order.advanceOrder === true
          && typeof user.order.orderDate !== 'undefined' && user.order.orderDate !== 'now') {
          const splitOrderDate = user.order.orderDate.split(' ');
          const splitDate = splitOrderDate[0].split('-');
          const splitTime = splitOrderDate[1].split(':');
          deliveryTime = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitTime[0]}:${splitTime[1]}`;
        }
        if (user.order.deliveryType === 'Delivery') {
          const address = getLocalStorage('delivery_address');
          const storeDetail = getLocalStorage('storeDetail');
          const storeCode = storeDetail.trade_zone_id !== 'undefined' ? storeDetail.trade_zone_id : ''; ;
          orderDetail = {
            'longitude': address.longitude,
            'latitude': address.latitude,
            'customer_id': loginUserInfo.customer_id,
            'service_method': 'delivery_delivery',
            'store_code': storeCode,
            'address_id': address.entity_id,
            'adv_status': '',
            'adv_time': '',
            'order_source': 'pwa',
            'delivery_time': deliveryTime,
            'remarks': additionInstruction,
          };
        } else if (user.order.deliveryType === 'Carryout') {
          const storeDetail = getLocalStorage('store');
          orderDetail = {
            'longitude': 0.0,
            'latitude': 0.0,
            'customer_id': loginUserInfo.customer_id,
            'service_method': 'carryout_carryout',
            'store_code': storeDetail.StoreCode,
            'address_id': '',
            'adv_status': '',
            'adv_time': '',
            'order_source': 'pwa',
            'delivery_time': deliveryTime,
            'remarks': additionInstruction
          };
        }
      }

      let payload = new FormData();
      let keys = Object.keys(orderDetail);
      keys.map((item) => {
        payload.append(item, orderDetail[item]);
      });
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${Config.url}setOrderDetail`,
          timeout: 100000,
          data: payload,
          headers: {
            'token': Config.token,
            'device-type': Config.devicetype,
            'Accept': Config.Accept,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        }).then((response)=> {
          dispatch(setLoggedinUserOrderDetail(false));
          resolve(true);
        }).catch(error => {
          dispatch(setLoggedinUserOrderDetail(false));
          resolve(true);
        });
      });
    }
  };
}

export const setPaymentOnline = (order_id) => {
  return(dispatch)=>{
  let requestData = {
      "transaction_details":{
        "order_id":order_id
      }
    };
  axios({
    method: 'post',
    url: `${API.pgurl}snapbin/payment/charge`,
    data : requestData,
    headers: {
      'token': Config.token,
      'device-type': Config.devicetype,
      'Accept': Config.Accept,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response)=> {
 
     dispatch(setPaymentOnlineData(response));
     if (!_.isEmpty(response.data)) {
        let token = response.data.token;
        let url = response.data.redirect_url;
        console.log(url)
        window.open = url;
       // dispatch(setPaymentOnlineData(response));
        snap.pay(token, {
          onSuccess: function(result){
            dispatch(onlineOrderResponse(order_id));
            console.log('success');
            console.log(result);
          },
          onPending: function(result){
            console.log('pending');
            console.log(result);
          },
          onError: function(result){
            console.log('error');
            console.log(result);
          },
          onClose: function(){
            console.log('customer closed the popup without finishing the payment');
          }
        })
      }
    });
  }
}

export const danaResponse = () => {
    window.location = danaUrl;
  //   return (dispatch) => {
  //     dispatch(onlineOrderResponse(order_id));
  //     console.log('in here 4');
  //     return new Promise((resolve, reject) => {
  //       console.log('in here 3');
  //     console.log('in here ');
  //     resolve(true);
  //   });  
  // }
}

var count =0;
export const onlineOrderResponse = (order_id) => {
  return(dispatch)=>{

    dispatch(placeOrderRequest());
    let url = `${Config.url}getOrderStatus`;
      axios.get(url, {
        params: {
          order_id: order_id
        },
        headers: {'token': Config.token,
          'device-type': Config.devicetype,
          'Accept': Config.Accept,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }).then( response => {
        dispatch(onlineOrderResponseData(response));
        if(response.data.order_status === "success") {
          removeLocalStorage(['cart', 'payment', 'price', 'productId']);
          browserHistory.push(Url.THANK_YOU);
        } else if(response.data.order_status === "canceled"){
          dispatch(setFailedPaymentState(true));
          dispatch(placeOrderResponse());
          dispatch(setAlertMeassage(true, translate(response.data.message)));
        } else if(response.data.order_status ==="pending") {
          if(count<=10){
            setTimeout(function() {dispatch(onlineOrderResponse(order_id)); count=count+1;}, 6000);
            dispatch(placeOrderRequest());
          } else {
          dispatch(setFailedPaymentState(true));
          dispatch(placeOrderResponse());
          dispatch(setAlertMeassage(true, translate("we could not place your order, your money will be refunded shortly.")));
          }
        }
      }).catch( error => {
         dispatch(placeOrderResponse());
         if (typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined' && typeof error.response.data.message !== 'undefined') {
          dispatch(setAlertMeassage(true, error.response.data.message));
        } else {
          dispatch(setAlertMeassage(true, translate("Sorry, we are currently experiencing technical difficulty. Please try again later or call 1 500 366 to place an order.")));
        }
    });
  }
}

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  setPaymentOption,
  placeOrder,
  setLoginUserPaymentMethod,
  setOrderDetail,
  setPaymentOnline,
  onlineOrderResponse,
  postPlaceOrder,
};

export const setAlert = () => {
  return (dispatch) => {
    dispatch(setAlertMeassage(true, translate("Please select payment option")));
  }
}

export const resetAlertBox = (showAlert, message) => {
  return (dispatch) => {
    dispatch(setAlertMeassage(showAlert, message));
  }
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PAYMENT_METHOD]: (state, action) => {
    return {
      ...state,
      paymentOption: action.paymentOption,
      setPayment: action.setPayment
    };
  },
  [PLACE_ORDER_REQUEST]: (state, action) => {
    return {
      ...state,
      placingOrder: action.placingOrder,
    };
  },
  [PLACE_ORDER_RESPONSE]: (state, action) => {
    return {
      ...state,
      placingOrder: action.placingOrder,
    };
  },
  [SET_ALERT_MESSAGE]: (state, action) => {
    return {
      ...state,
      showAlert: action.showAlert,
      alertMessage: action.alertMessage
    };
  },
  [SET_PAYMENT_DETAIL]: (state, action) => {
    return {
      ...state,
      savePayment: action.savePayment
    };
  },
  [SET_ORDER_DETAIL]: (state, action) => {
    return {
      ...state,
      saveOrderDetail: action.saveOrderDetail
    };
  },
  [STORE_TIME_DETAIL] : (state, action) => {
    return {
      ...state,
      storeTimeDetailData : action.storeTimeDetailData
    }
  },
  [SET_PAYMENT_ONLINE] : (state, action) => {
    return {
      ...state,
      paymentOnlineData : action.paymentOnlineData
    }
  },
  [SET_FAILED_PAYMENT_STATE] : (state, action) => {
    return {
      ...state,
      isPgPaymentFailed : action.isPgPaymentFailed
    }
  },
  [ONLINE_ORDER_RESPOSE] : (state, action) => {
  return {
    ...state,
    onlineOrderResponseData : action.onlineOrderResponseData
  }
},
  [FETCHING_STORE_LIST]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_STORE_LIST]: (state, action) => {
    return {
      ...state,
      storeList: action.storeList
    };
  },
  [STORE_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  //  [FETCHING_TIMESTAMP]: (state, action) => {
  //   return {
  //     ...state,
  //     fetchingTimeStamp: action.fetchingTimeStamp
  //   };
  // },

  //  [FETCHING_TIMESTAMP]: (state, action) => {
  //   return {
  //     ...state,
  //     fetchingTimeStamp: action.fetchingTimeStamp
  //   };
  // },
  //    [FETCH_TIMESTAMP]: (state, action) => {
  //   return {
  //     ...state,
  //     timeStamp: action.timeStamp
  //   };
  // },
  
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  paymentOption: '',
  setPayment: false,
  placingOrder: false,
  showAlert: false,
  alertMessage: '',
  savePayment: false,
  saveOrderDetail: false,
  isPgPaymentFailed: false,
  storeList: [],
  fetchingTimeStamp:false,
  timeStamp:""
};

export default function orderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
