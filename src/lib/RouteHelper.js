import { getLocalStorage } from 'components/Helpers';

export const getProductDetailQueryParam = (location) => {
  let resp = { sku : '', type: '' };
  const splitPath = location.pathname.split('/');
  const queryParam = getLocalStorage('pseudoRoute');
  if (typeof queryParam[splitPath[2]] !== 'undefined') {
    resp['sku'] = queryParam[splitPath[2]].sku;
    resp['type'] = queryParam[splitPath[2]].type;
  }
  if (resp.sku === '' && splitPath[1] !== 'undefined' && typeof splitPath[2] !== 'undefined') {
    let productList = {};
    let type = '';
    switch(splitPath[1]) {
      case 'special-offers':
        resp.type = 'promotion';
        productList = getLocalStorage('promotionList');
        break;
      case 'paket-hemat':
        resp.type = 'valuedeal';
        productList = getLocalStorage('valueDealsList');
        break;
      case 'pizza':
        resp.type = 'pizza';
        const pizzaList = getLocalStorage('pizzaList');
        if (pizzaList.length > 0) {
          pizzaList.map((item) => {
            Array.prototype.push.apply(productList, item.products);
          });
        }
        break;
      case 'sides-desserts':
        resp.type = 'sides';
        const sideList = getLocalStorage('sidesDessert');
        if (sideList.length > 0) {
          sideList.map((item) => {
            Array.prototype.push.apply(productList, item.products);
          });
        }
        break;
      case 'beverages':
        resp.type = 'beverages';
        const beverageList = getLocalStorage('beverage');
        if (beverageList.length > 0) {
          beverageList.map((item) => {
            Array.prototype.push.apply(productList, item.products);
          });
        }
        break;
    }
    if (Object.keys(productList).length > 0) {
      Object.keys(productList).map((key) => {
        if (productList[key].url_key === splitPath[2]) {
          resp.sku = productList[key].sku;
        }
      })
    }
  }
  return resp;
};

export const webRedirectMenuSlide = (path) => {
  let slideIndex = 0;
  switch (path) {
    case 'special-offers':
      slideIndex = 0;
      break;
    case 'paket-hemat':
      slideIndex = 1;
      break;
    case 'pizza':
      slideIndex = 2;
      break;
    case 'sides-desserts':
      slideIndex = 3;
      break;
    case 'beverages':
      slideIndex = 4;
      break;
    default:
      slideIndex = 0;
      break;
  }
  return slideIndex;
}
