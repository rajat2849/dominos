import { browserHistory, Router } from 'react-router';
import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { getLocalStorage } from 'components/Helpers';
import { Url } from 'config/Config';
import { resetAlertBox } from './modules/order';

export function isCartEmpty (store) {
  let cart = getLocalStorage('cart');
  if (cart.length <= 0) {
    // store.dispatch(resetAlertBox(true, "your cart is Empty"));
    browserHistory.push(Url.MENU_PAGE);
  }
}

export default (store) => ({
  path: 'online-order/order/confirmation',
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
      isCartEmpty(store);
    })
  },
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Order = require('./containers/OrderContainer').default;
      const reducer = require('./modules/order').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'Order', reducer });

      /*  Return getComponent   */
      cb(null, Order);

    /* Webpack named bundle   */
    }, 'Order');
  },
});
