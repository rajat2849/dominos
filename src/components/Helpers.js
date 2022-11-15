import ReactPixel from "react-facebook-pixel";
import Urlencode from "urlencode";
import $ from "cheerio";
import _ from 'lodash';

import { translations } from "../translations";
/*
 *    Global method (saveLocalStorage, getLocalStorage & removeLocalStorage, getAllArchive). use these *    helper method to store, get and remove, getAllArchive the value from localstorage.
 */
export const saveLocalStorage = (key, values) => {
  var data = [];
  data.push(values);
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = key => {
  var data = JSON.parse(localStorage.getItem(key));
  if (
    typeof data !== "undefined" &&
    data !== null &&
    typeof data[0] !== "undefined"
  ) {
    return data[0];
  }
  return [];
};
/**
 * @description: Delete data from local storage
 *  1. if key is string, remove that key only from localStorage
 *  2. if key is array, remove all array value from localStorage
 */
export const removeLocalStorage = keys => {
  if (typeof keys === "string") {
    localStorage.removeItem(keys);
  } else if (Array.isArray(keys) && keys.length > 0) {
    keys.map(key => {
      localStorage.removeItem(key);
    });
  }
};

// export const getAllArchive = () => {
//   var archive = [],
//     keys = Object.keys(localStorage),
//     i = keys.length;

//   while ( i-- ) {
//     archive.push(
//       {
//         [keys[i]]: localStorage.getItem(keys[i])
//       }
//     );
//   }
//   return archive;
// };

export const saveSessionStorage = (key, values) => {
  var data = [];
  data.push(values);
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionStorage = key => {
  var data = JSON.parse(sessionStorage.getItem(key));
  if (
    typeof data !== "undefined" &&
    data !== null &&
    typeof data[0] !== "undefined"
  ) {
    return data[0];
  }
  return [];
};
/*
  method to filter the promotion list having status hidden.
*/
export const filterPromotionList = (list, day, orderType) => {
  let promotionList = [];
  let newPromotionList = [];
  list.map((item, index) => {
    let device = item.value_device_detect.split(",");
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let hrs = hours * 60 + min;
    let startTimeArr = item.hour_start.split(":");
    let endTimeArr = item.hour_end.split(":");
    let startTime = 0;
    let endTime = 0;

    if (startTimeArr[0] != "00") {
      startTime = parseInt(startTimeArr[0]) * 60 + parseInt(startTimeArr[1]);
    } else {
      startTime = hrs;
    }
    if (endTimeArr[0] != "00") {
      endTime = parseInt(endTimeArr[0]) * 60 + parseInt(endTimeArr[1]);
    } else {
      endTime = hrs;
    }
    if (
      item.hidden == "0" &&
      item.period_day.indexOf(day) >= 0 &&
      (device.indexOf("pwa") >= 0 || device.indexOf(" pwa") >= 0) &&
      hrs >= startTime &&
      hrs < endTime
    ) {
      //  if (item.hidden == '0' && item.period_day.indexOf(day) >=0 && (device.indexOf('pwa') >=0 || device.indexOf(' pwa') >=0)) {
      promotionList.push(item);
    }
  });
  promotionList.sort(sortBy);
  return promotionList;
};
// This method is used to sort the promotion based on sort key.
export const sortBy = (value1, value2) => {
  if (value1.sort == value2.sort) {
    return 0;
  }
  if (value1.sort > value2.sort) {
    return -1;
  } else {
    return 1;
  }
};
/*
  method to filter value deals having the status hidden.
*/
export const filterValueDealsList = data => {
  let valueDealsList = [];
  const list = _.get(data , "data", []);
  list && list.map((item, index) => {
    let device = item.value_device_detect.split(",");
    if (
      list[index].hidden == "0" &&
      (device.indexOf("pwa") >= 0 || device.indexOf(" pwa") >= 0)
    ) {
      valueDealsList.push(list[index]);
    }
  });
  valueDealsList.sort(sortBy);
  return valueDealsList;
};
/*
  Method to filter promotion details list by pushing only name and thumbnail.
*/
export const filterPromotionDetail = list => {
  let pizza = [];
  let name_en = "";
  let limit = 0;
  list.options.map(item => {
    if (limit === 0) {
      item.item.map(item => {
        if (name_en != item.name_en) {
          pizza.push({
            name: item.name_en,
            thumbnail: item.thumbnail
          });
          name_en = item.name_en;
        }
      });
    }
    limit++;
  });
  return pizza;
};
/*
  Method to prepare the promotion list based on requirement.
*/
export const sortPromotionArray = list => {
  let finalArray = [];
  list.options.map(item => {
    let sortedArray = [];
    sortedArray = preparePizzaAttribute(item.item, "", item.option_id);
    finalArray.push(sortedArray);
  });
  return finalArray;
};

// export const ValidateTime = () => {
//   let myArray = [];
//   let date = new Date().getDate();
//   let month = new Date().getMonth() + 1; //Current Month
//   let year = new Date().getFullYear(); //Current Yea
//   let hours = new Date().getHours(); //Current Hours
//   let min = new Date().getMinutes(); //Current Minutes
//   let sec = new Date().getSeconds(); //Current Seconds
//   let currentDate =
//     year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
//   let hrs = hours + ":" + min;
// };
/*
 * @param options - list
 * @param sku - parentsku  (in case of pizza)
 * @param option_id - in case of promotion
 */
export const preparePizzaAttribute = (options, sku, option_id) => {
  let sortedArray = [];
  options.map((data, index) => {
    if (typeof option_id !== "undefined") {
      data.option_id = option_id;
    }
    data.parent_sku = sku;
    if (sortedArray[data.name_en] !== undefined) {
      if (sortedArray[data.name_en][data.crust] !== undefined) {
        if (sortedArray[data.name_en][data.crust][data.size] !== undefined) {
          sortedArray[data.name_en][data.crust][data.size] = data;
        } else {
          let size = [];
          size[data.size] = data;
          sortedArray[data.name_en][data.crust].push(size);
        }
      } else {
        let crust = [];
        let size = [];
        size[data.size] = data;
        crust[data.crust] = size;
        sortedArray[data.name_en].push(crust);
      }
    } else {
      let crust = [];
      let size = [];
      size[data.size] = data;
      crust[data.crust] = size;
      sortedArray[data.name_en] = [];
      sortedArray[data.name_en].push(crust);
    }
  });
  return sortedArray;
};

export const sortPromotionDetail = options => {
  let sortedPromotionDetailArray = [];
  options.map((items, index) => {
    sortedPromotionDetailArray[index] = {};
    sortedPromotionDetailArray[index][items.title] = [];
    sortedPromotionDetailArray[index][items.title].push(items.item);
  });
  return sortedPromotionDetailArray;
};
/*
  Method to filter value deals details by pushing only name and thumbnail.
*/
export const filterValueDealsDetail = list => {
  let valueDeals = [];
  let name_en = "";
  list.options.map(item => {
    item.item.map(item => {
      if (name_en != item.name_en) {
        valueDeals.push({
          name: item.name_en,
          thumbnail: item.thumbnail
        });
        name_en = item.name_en;
      }
    });
  });
  return valueDeals;
};
/*
  method to prepare valuedeals list based on requirement.
*/
export const sortValueDealsArray = list => {
  let finalArray = [];
  let drink = [];
  let sides = [];
  list.options.map(item => {
    let sortedArray = [];
    if (item.title === "Choose One Pizza") {
      item.item.map(data => {
        if (sortedArray[data.name_en] !== undefined) {
          if (sortedArray[data.name_en][data.crust] !== undefined) {
            if (
              sortedArray[data.name_en][data.crust][data.size] !== undefined
            ) {
              sortedArray[data.name_en][data.crust][data.size] = data;
            } else {
              let size = [];
              size[data.size] = data;
              sortedArray[data.name_en][data.crust].push(size);
            }
          } else {
            let crust = [];
            let size = [];
            size[data.size] = data;
            crust[data.crust] = size;
            sortedArray[data.name_en].push(crust);
          }
        } else {
          let crust = [];
          let size = [];
          size[data.size] = data;
          crust[data.crust] = size;
          sortedArray[data.name_en] = [];
          sortedArray[data.name_en].push(crust);
        }
      });
      finalArray[item.title] = sortedArray;
    } else if (item.title === "Choose Side / Dessert") {
      item.item.map(data => {
        sides.push(data);
        finalArray[item.title] = sides;
      });
    } else if (item.title === "Choose Drink") {
      item.item.map(data => {
        drink.push(data);
        finalArray[item.title] = drink;
      });
    }
  });
  return finalArray;
};

export const filterPizzaDetail = pizzaDetail => {
  return {
    name: pizzaDetail.name_en,
    description: pizzaDetail.description_en,
    thumbnail: pizzaDetail.thumbnail,
    sku: pizzaDetail.sku
  };
};

export const sortPizzaArray = (pizzaDetail, sku) => {
  let finalArray = [];
  let sortedArray = [];
  sortedArray = preparePizzaAttribute(pizzaDetail.options, sku);
  finalArray.push(sortedArray);
  return finalArray;
};
/*
 *  Method is used to prepare sorted data that meet to our requirement and currently work in
 *  case of pizza.
 */
export const prepareProductDetailArray = (options, productType = "") => {
  const productName = getLocalStorage("productName");
  let option = productType === "promotion" ? options[0].item : options;
  let productDetail = [];
  if (productType === "sides") {
    option.map((data, index) => {
      if (productName === "Beef & Rice") {
        if (productDetail[data.sauce] !== undefined) {
          if (data.sauce in productDetail) {
            let productSize = [];
            productSize[data.size] = data;
            productDetail[data.sauce].push(productSize);
          }
        } else {
          productDetail[data.sauce] = [];
          let productSize = [];
          productSize[data.size] = data;
          productDetail[data.sauce].push(productSize);
        }
      } else {
        if (productDetail[data.chicken] !== undefined) {
          if (data.chicken in productDetail) {
            let productSauce = [];
            productSauce[data.sauce] = data;
            productDetail[data.chicken].push(productSauce);
          }
        } else {
          productDetail[data.chicken] = [];
          let productSauce = [];
          productSauce[data.sauce] = data;
          productDetail[data.chicken].push(productSauce);
        }
      }
    });
  } else {
    option.map((data, index) => {
      if (productDetail[data.size] !== undefined) {
        if (data.size in productDetail) {
          let productCrust = [];
          productCrust[data.crust] = data;
          productDetail[data.size].push(productCrust);
        }
      } else {
        productDetail[data.size] = [];
        let productCrust = [];
        productCrust[data.crust] = data;
        productDetail[data.size].push(productCrust);
      }
    });
  }
  return productDetail;
};
// /*
//  * function sleep
//  * use this function if u want to wait for some pprocess
//  */
// export const sleep = time => {
//   return new Promise(resolve => setTimeout(resolve, time));
// };

// export const trimString = (value, length) => {
//   let trimmedString = value;
//   if (value.length >= length) {
//     trimmedString = value.substring(0, length);
//     trimmedString =
//       trimmedString.substr(
//         0,
//         Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
//       ) + " ...";
//   }
//   return trimmedString;
// };

export const translate = message => {
  let siteLang = getLocalStorage("siteLanguage");
  if (typeof siteLang === "undefined" || siteLang === "") {
    siteLang = DEFAULT_SITE_LANGUAGE;
  }
  if (
    typeof translations[siteLang] !== "undefined" &&
    typeof translations[siteLang][message] !== "undefined" &&
    translations[siteLang][message].trim() !== ""
  ) {
    message = translations[siteLang][message];
  }
  return message;
};
/*
 *  this method is used to prepare the default toppings in form of key-value pair.
 */
export const prepareDefaultToppings = defaultTopping => {
  let defaultToppings = defaultTopping.split(",");
  let toppings = [];
  const toppingList = getLocalStorage("toppingsList");
  defaultToppings.map(topping => {
    let toppingDetail =
      typeof toppingList[topping.toLowerCase()] !== "undefined"
        ? toppingList[topping.toLowerCase()]
        : { image: "", opt_name_en: "" };
    toppings.push({
      code: topping,
      name: toppingDetail.opt_name_en,
      image: toppingDetail.image,
      count: 1
    });
  });
  return toppings;
};

export const preparedDataForCart = cart => {
  let preparedData = {};
  let sku = "";
  let toppings = [];
  let options = {};
  let fullSku = "";
  let category = "";
  fullSku = cart[Object.keys(cart)].sku;
  const splitSku = fullSku.split("_");
  sku = splitSku[0];
  category = splitSku[1];
  toppings = cart[Object.keys(cart)].topping;
  if (
    typeof toppings !== undefined &&
    toppings !== null &&
    toppings.length > 0
  ) {
    let toppingName = "";
    let toppingCount = 0;
    toppings.forEach(function(item) {
      if (item !== null && item.name !== "") {
        toppingName = item.name;
        toppingCount = item.count;
        if (
          typeof item.additionalCount !== "undefined" &&
          isNaN(item.additionalCount) === false &&
          item.additionalCount !== null &&
          item.additionalCount > 0
        ) {
          toppingCount = item.additionalCount > 3 ? 3 : item.additionalCount;
        }
        options[`${toppingName}`] = parseInt(toppingCount);
      }
    });
  }
  if (category === "promotion") {
    const objectValues = Object.values(cart);
    if (
      typeof objectValues !== "undefined" &&
      typeof objectValues[0] !== "undefined" &&
      typeof objectValues[0].additionalInfo !== "undefined"
    ) {
      const additionalInfo = objectValues[0].additionalInfo;
      Object.keys(additionalInfo).map(child => {
        options[additionalInfo[child].option_id] = additionalInfo[child].sku;
      });
    }
  }
  if (category === "valueDeals") {
    const objectValues = Object.values(cart);
    if (
      typeof objectValues !== "undefined" &&
      typeof objectValues[0] !== "undefined" &&
      typeof objectValues[0].valueDealsOptions !== "undefined"
    ) {
      options = objectValues[0].valueDealsOptions;
    }
  }
  let itemQty = cart[Object.keys(cart)].qty;
  let user = getLocalStorage("receivedLoginDetail");
  preparedData = {
    sku: sku,
    qty: itemQty,
    options: JSON.stringify(options),
    customer_id: user.customer_id
  };
  return preparedData;
};

export const preparePlaceOrderCart = cart => {
  let preparedData = [];
  let itemData = {};
  let parentSku = "";
  let sku = "";
  let fullSku = "";
  let category = "";

  cart.map(item => {
    //parentSku = item[item.id + "_" + item.category].parent_sku;
    //parentSku = item[Object.keys(item)].parent_sku;
    //fullSku = item[Object.keys(item)].sku;
    // fullSku = item[item.id+"_"+item.category].sku;
    // const splitSku = fullSku.split('_');
    // sku = splitSku[0];
    // category = splitSku[1];
    sku = item.item.sku;
    category = item.category;
    //let toppings =  item[Object.keys(item)].topping;

    //let toppings = item[item.id + "_" + item.category].topping;
    let options = {};
    if (
      category === "pizza" &&
      typeof toppings !== "undefined" &&
      toppings.length > 0
    ) {
      let toppings = item[item.id + "_" + item.category].topping;
      let toppingName = "";
      let toppingCount = 0;
      toppings.forEach(function(item) {
        if (item !== null && item.name !== "") {
          toppingName = item.name;
          toppingCount = item.count;
          if (
            typeof item.additionalCount !== "undefined" &&
            isNaN(item.additionalCount) === false &&
            item.additionalCount !== null &&
            item.additionalCount > 0
          ) {
            toppingCount = item.additionalCount > 3 ? 3 : item.additionalCount;
          }
          options[`${toppingName}`] = parseInt(toppingCount);
        }
      });
    }

    if (category === "promotion") {
      //const objectValues = Object.values(item);
      //&& typeof objectValues[0] !== 'undefined'
      //objectValues[0].additionalInfo
      const objectValues = item[item.id + "_" + item.category];
      if (
        typeof objectValues !== "undefined" &&
        typeof objectValues.additionalInfo !== "undefined"
      ) {
        //const additionalInfo = objectValues[0].additionalInfo;
        const additionalInfo = objectValues.additionalInfo;
        Object.keys(additionalInfo).map(child => {
          options[additionalInfo[child].option_id] = additionalInfo[child].sku;
        });
      }
    }
    if (category === "valueDeals") {
      //const objectValues = Object.values(item);
      //&& typeof objectValues[0] !== 'undefined'
      //objectValues[0].valueDealsOptions
      const objectValues = item[item.id + "_" + item.category];
      if (
        typeof objectValues !== "undefined" &&
        typeof objectValues.valueDealsOptions !== "undefined"
      ) {
        Object.keys(objectValues.valueDealsOptions).map(optionId => {
          options[optionId] = objectValues.valueDealsOptions[optionId];
        });
      }
    }

    //let itemQty = item[Object.keys(item)].qty;
    let itemQty = item.quantity;
    itemData = {
      sku: sku,
      qty: itemQty,
      options: JSON.stringify(options),
      parent_sku: sku
    };
    preparedData.push(itemData);
  });
  return preparedData;
};

// export const calculateToppingPrice = (updatedToppings, defaultSize) => {
//   let defaultToppings = getSessionStorage("toppings");
//   let defaultLength = defaultToppings.length;
//   let updatedLength =
//     updatedToppings !== undefined ? updatedToppings.length : 0;
//   let toppingPrice = 0;
//   if (updatedLength !== defaultLength && updatedLength > defaultLength) {
//     if (defaultSize === "Medium" || defaultSize === "Large") {
//       let additionalTopping = 0;
//       updatedToppings.map(topping => {
//         if (topping !== null && typeof topping.count !== "undefined") {
//           // for additional topping
//           if (
//             typeof topping.additionalCount !== "undefined" &&
//             isNaN(topping.additionalCount) === NaN &&
//             topping.additionalCount > 0
//           ) {
//             additionalTopping += parseInt(topping.count);
//           } else {
//             // for default topping
//             additionalTopping += parseInt(topping.count) - 1;
//           }
//         }
//       });
//       toppingPrice =
//         additionalTopping * (defaultSize === "Medium" ? 6364 : 8182);
//     } else if (defaultSize === "Personal") {
//       if (typeof updatedToppings !== "undefined" && updatedToppings !== "") {
//         updatedToppings.map(item => {
//           if (item !== null && item.code === "Bg" && item.count > 1) {
//             toppingPrice = (item.count - 1) * 4091;
//           }
//         });
//       }
//     }
//   }
//   return toppingPrice;
// };

export const validateToppings = (cartToppings, sessionToppings) => {
  let isSameTopping = false;
  /*
   *  Fisrt check the length of both toppings array
   *  If it is not equal then it is a new product and return isSameTopping false.
   *  If having the same length then we matched the count of each topping item to another topping item that having the same
   *  topping code.
   */
  if (cartToppings.length === sessionToppings.length) {
    let matchedCount = 0;
    cartToppings.map(topping => {
      let isMatched = false;
      sessionToppings.map(entity => {
        if (
          topping !== null &&
          entity !== null &&
          topping.code === entity.code &&
          topping.count === entity.count &&
          isMatched === false
        ) {
          isMatched = true;
          matchedCount += 1;
        } else if (topping === null && entity === null) {
          isMatched = true;
          matchedCount += 1;
        }
      });
    });
    if (matchedCount === sessionToppings.length) {
      isSameTopping = true;
    }
  }
  return isSameTopping;
};

export const checkForSamePromotion = (sessionCart, localstorageCart) => {
  let isSamePromotion = false;
  let matchedCount = 0;
  const totalItem = Object.keys(sessionCart.additionalInfo).length;
  Object.keys(sessionCart.additionalInfo).map(sessionIndex => {
    let isMatched = false;
    Object.keys(localstorageCart.additionalInfo).map(cartIndex => {
      if (
        localstorageCart.additionalInfo[cartIndex].sku ===
          sessionCart.additionalInfo[sessionIndex].sku &&
        localstorageCart.additionalInfo[cartIndex].option_id ===
          sessionCart.additionalInfo[sessionIndex].option_id &&
        isMatched == false
      ) {
        isMatched = true;
        matchedCount += 1;
      }
    });
  });
  if (totalItem === matchedCount) {
    isSamePromotion = true;
  }
  return isSamePromotion;
};

export const checkForSameValueDeals = (sessionCart, localstorageCart) => {
  let isSameVD = false;
  let matchedCount = 0;
  const totalItem = Object.keys(sessionCart.additionalInfo).length;
  Object.keys(sessionCart.additionalInfo).map(sessionIndex => {
    let isMatched = false;
    Object.keys(localstorageCart.additionalInfo).map(cartIndex => {
      if (
        localstorageCart.additionalInfo[cartIndex].sku ===
          sessionCart.additionalInfo[sessionIndex].sku &&
        isMatched == false
      ) {
        isMatched = true;
        matchedCount += 1;
      }
    });
  });
  if (totalItem === matchedCount) {
    isSameVD = true;
  }
  return isSameVD;
};
/*
 *  This method is used to track the adds with facebook pixel
 *  standard tell that the calling event is standard or not. if standard is true then event is standard otherwise not.
 *  we are calling a event viewCategory on MainMenu component that is a non-standard or custom event.
 */
export const trackAddsWithFacebookPixel = (
  event = "PageView",
  data = {},
  standard = true
) => {
  const pixelId = `${FacebookPixel.PIXEL_ID}`;
  ReactPixel.init(pixelId);
  ReactPixel.pageView();
  if (standard === true) {
    ReactPixel.track(event, data);
  } else {
    ReactPixel.trackCustom(event, data);
  }
};

export const prepareAddToCartPixelData = (Tax, productId, productSku) => {
  let productIdCollection =
    getLocalStorage("productId").length > 0 ? getLocalStorage("productId") : [];
  let productSkuExist = false;
  /*
   *  check the coming sku is exist in productIdCollection on not
   *  if exist then it means user is updating the product quantity
   *  in this case we do not need to add data to localstorage
   *  because either product have 1 quantity or more we have only one option to remove and if we have same sku more than 1
   *  then it will remove only one time when we remove the product from cart.
   *  so make sure not to add same sku more than one time.
   */
  if (productIdCollection !== "undefined" && productIdCollection.length > 0) {
    productIdCollection.map(item => {
      if (item.productSku === productSku) {
        productSkuExist = true;
      }
    });
    if (productSkuExist === false) {
      let data = {
        productSku: productSku,
        productId: productId
      };
      productIdCollection.push(data);
    }
  } else {
    let data = {
      productSku: productSku,
      productId: productId
    };
    productIdCollection.push(data);
  }
  saveLocalStorage("productId", productIdCollection);
  let pixelData = {
    content_type: "product",
    content_ids: [productId],
    source: "magento",
    pluginVersion: "2.1.11-fb",
    version: "1.9.2.4"
  };
  return pixelData;
};

export const filterTrackingCode = trackingCode => {
  return trackingCode.replace("#", "-");
};

export const encodeUri = storeName => {
  return Urlencode(storeName);
};

export const customizePath = queryParam => {
  let object = {};
  if (queryParam !== undefined && queryParam !== "") {
    let str = queryParam.slice(1, queryParam.length);
    let splitArr = str.split("&");
    if (splitArr.length > 2) {
      let id = splitArr[0];
      splitArr = splitArr.splice(1, splitArr.length);
      splitArr = splitArr.join("");
      object.id = id.split("=")[1];
      object.token = splitArr.split("=")[1];
    } else {
      object.id = splitArr[0].split("=")[1];
      object.token = splitArr[1].split("=")[1];
    }
  }
  // saveLocalStorage('resetPassword', object);
  return object;
};

export const optimise = () => {
  let orderConfirm = getLocalStorage("orderConfirm");
  let paymentMode = getLocalStorage("paymentMode");
  let vouchercode = getLocalStorage("vouchercode");
  let affiliateInformation = getLocalStorage("affiliateInformation");
  let isOrderFromAffiliate =
    affiliateInformation.isOrderFromAffiliate &&
    affiliateInformation.isOrderFromAffiliate === true
      ? true
      : false;
  let voucherCode;
  if (vouchercode !== "undefined" && vouchercode !== null) {
    voucherCode = vouchercode;
  } else {
    voucherCode = "";
  }

  if (
    isOrderFromAffiliate === true &&
    affiliateInformation.affiliateSource === "OP"
  ) {
    const script = document.createElement("script");
    script.src = `https://track.omguk.com/1860891/e/ss/?APPID=${orderConfirm.order_id}&MID=1860891&PID=35216&status=${orderConfirm.total}&CUR=IDR&EX1=${paymentMode.option}&EX2=${voucherCode}`;
    document.body.appendChild(script);
  }

  if (
    isOrderFromAffiliate === true &&
    affiliateInformation.affiliateSource === "theinthings.com"
  ) {
    const script = document.createElement("IMG");
    script.src = `https://biz-ad.vnative.net/pixel?adid=5d95c87fb6920d569840eb39&txn_id=${orderConfirm.order_id}&sale_amount=${orderConfirm.total}`;
    document.body.appendChild(script);
  }
};

export const modifyList = list => {
  const filterList = [];
  list.map((item, index) => {
    if (_.includes(item.image, "jpg")) {
      item.src = item.image;
      filterList.push(item);
    }
  });

  /*  export const pizzaList = (list) => {
    const filterPizzaList = [];
    list.map((item, index) => {
      
    })
  }*/

  return filterList;
};

/*export const resizeImage = () => {
  resizeBase64Img(oldBase64, 100, 100).then(function(newImg){
    return newImg;
  });
}*/

export const resizeBase64Img = (base64, width, height) => {
  console.log("hiiiiii i m in here");
  var canvas = document.createElement("canvas");
  console.log("convas", canvas);
  canvas.width = width;
  console.log("aaaaaaaaaa", canvas.width);
  canvas.height = height;
  console.log("bbbbbbbbbb", canvas.height);
  var context = canvas.getContext("2d");
  console.log("--------------- ", $.Deferred());
  console.log("i am in context", context);
  var deferred = $.Deferred();
  console.log("i am in deferred", deferred);
  $("<img/>")
    .attr("item.src", "data:image/gif;base64," + base64)
    .load(function() {
      context.scale(width / this.width, height / this.height);
      context.drawImage(this, 0, 0);
      deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));
      console.log("deferred", deferred);
    });
  return deferred.promise();
};

const addressFilter = result => {
  let returnData = {};
  if (typeof result.address_components !== "undefined") {
    let data = result.address_components;

    if (typeof result.formatted_address !== "undefined") {
      returnData.formatted_address = result.formatted_address;
    }

    if (typeof result.geometry.location.lat !== "undefined") {
      returnData.lat = result.geometry.location.lat;
    }

    if (typeof result.geometry.location.lng !== "undefined") {
      returnData.lng = result.geometry.location.lng;
    }

    data.forEach((row, index) => {
      if (typeof row.types !== "undefined") {
        if (row.types.indexOf("route") !== -1) {
          returnData.route = data[index];
        }

        if (row.types.indexOf("street_number") !== -1) {
          returnData.street_number = data[index];
        }

        if (row.types.indexOf("postal_code") !== -1) {
          returnData.postal_code = data[index];
        }

        if (row.types.indexOf("administrative_area_level_1") !== -1) {
          returnData.administrative_area_level_1 = data[index];
        }

        if (row.types.indexOf("administrative_area_level_2") !== -1) {
          returnData.administrative_area_level_2 = data[index];
        }

        if (row.types.indexOf("administrative_area_level_3") !== -1) {
          returnData.administrative_area_level_3 = data[index];
        }

        if (row.types.indexOf("floor") !== -1) {
          returnData.floor = data[index];
        }

        if (row.types.indexOf("premise") !== -1) {
          returnData.premise = data[index];
        }

        if (row.types.indexOf("subpremise") !== -1) {
          returnData.subpremise = data[index];
        }

        if (row.types.indexOf("neighborhood") !== -1) {
          returnData.neighborhood = data[index];
        }

        if (row.types.indexOf("street_address") !== -1) {
          returnData.street_address = data[index];
        }

        if (row.types.indexOf("locality") !== -1) {
          returnData.locality = data[index];
        }
      }
    });
  }

  return returnData;
};

export const generateGuestAddress = () => {
  let returnData = {
    substreet: "",
    tower: "",
    floor: "",
    kavnumber: "",
    postal_code: "",
    city: "",
    region: "",
    place: "",
    address: "",
    street: "",
    locality: "",
    longitude: "",
    latitude: ""
  };

  const addressComponent = getLocalStorage("choosenAddress");

  if (typeof addressComponent.address_components !== "undefined") {
    let filterAddress = addressFilter(addressComponent);

    if (typeof filterAddress.lat !== "undefined") {
      returnData.latitude = filterAddress.lat;
    }

    if (typeof filterAddress.lng !== "undefined") {
      returnData.longitude = filterAddress.lng;
    }

    if (typeof filterAddress.formatted_address !== "undefined") {
      returnData.address = filterAddress.formatted_address;
    }

    if (typeof filterAddress.route !== "undefined") {
      returnData.substreet = filterAddress.route.short_name;
    }

    if (typeof filterAddress.locality !== "undefined") {
      returnData.locality = filterAddress.locality.short_name;
    }

    if (typeof filterAddress.street_number !== "undefined") {
      let street_number = filterAddress.street_number.short_name;

      if (street_number.search("Kav") !== -1) {
        returnData.kavnumber = street_number;
      }

      returnData.street = street_number;
    }

    if (typeof filterAddress.street_address !== "undefined") {
      returnData.substreet =
        returnData.substreet + " " + filterAddress.street_address.short_name;
    }

    if (typeof addressComponent.name !== "undefined") {
      returnData.place = addressComponent.name;
    }

    if (typeof filterAddress.floor !== "undefined") {
      returnData.floor = filterAddress.floor.short_name;
    }

    if (typeof filterAddress.premise !== "undefined") {
      returnData.tower = filterAddress.premise.short_name;
    }

    if (typeof filterAddress.subpremise !== "undefined") {
      returnData.tower =
        returnData.tower + " " + filterAddress.subpremise.short_name;
    }

    if (typeof filterAddress.postal_code !== "undefined") {
      returnData.postal_code = filterAddress.postal_code.long_name;
    }

    if (typeof filterAddress.administrative_area_level_2 !== "undefined") {
      returnData.region = filterAddress.administrative_area_level_2.long_name;
    }

    if (typeof filterAddress.administrative_area_level_3 !== "undefined") {
      returnData.city = filterAddress.administrative_area_level_3.long_name;
    }

    returnData.street = returnData.address.substr(0, 50);

    returnData.city =
      returnData.city === "" ? returnData.region : returnData.city;

    returnData.substreet = returnData.substreet.replace(
      returnData.kavnumber,
      ""
    );
  }

  return returnData;
};

export const CommaFormatted = amount => {
  const lang = getLocalStorage("siteLanguage");
  var delimiter = lang === "en" ? "," : "."; // replace comma if desired
  var a = amount;
  //var d = a[1];
  var i = parseInt(a);
  if (isNaN(i)) {
    return "";
  }
  var minus = "";
  if (i < 0) {
    minus = "-";
  }
  i = Math.abs(i);
  var n = new String(i);
  var a = [];
  while (n.length > 3) {
    var nn = n.substr(n.length - 3);
    a.unshift(nn);
    n = n.substr(0, n.length - 3);
  }
  if (n.length > 0) {
    a.unshift(n);
  }
  n = a.join(delimiter);
  //if(d.length < 1) { amount = n; }
  //else { amount = n; }
  amount = n;
  amount = minus + amount;
  return amount;
};


export const checkItemLimit = () => {
  const limitData = getLocalStorage("configurationData")
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const maxItem = _.get(limitData , "max_item.data.limit" , "")
  const msg = _.get(limitData , "max_item.msg.en" , "")

  let cartQuantity = 0;
  if(cartItems.length > 0){
    cartItems.forEach(item => {
      cartQuantity = cartQuantity + item.quantity
    })
  } 
  if(cartQuantity >= maxItem) {
    return msg;
  } else {
    return ""
  }
}

export const aggregatePizzaProducts = (pizzaList, item) => {
  let PizzaToDisplay = {};
  try {
    // if pizzaList is not empty because it depends on api capp and redux store
    if (!_.isEmpty(pizzaList)) {
      // iterating category wise
      for (const lists of pizzaList) {
        // iterating products of each category
        for (const product of lists.products) {
          // iterating options of each product of each category
          for (const option of product.options) {
            if (option.name_en === item.name_en) {
              PizzaToDisplay = product;
            }
          }
        }
      }
      return PizzaToDisplay;
    }
  } catch (error) {
    console.log('error while aggreagating pizza products', error);
    return PizzaToDisplay;
  }
}
