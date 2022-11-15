import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.VIEW_CART,
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
    })
  },

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const ViewCart = require('./containers/ViewCartContainer').default;
       const reducer = require('./modules/ViewCart').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'ViewCart', reducer });

      /*  Return getComponent   */
      cb(null, ViewCart);

    /* Webpack named bundle   */
    }, 'ViewCart');
  },
});
