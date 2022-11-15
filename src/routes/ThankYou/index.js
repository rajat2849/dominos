import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index';
import { fetchUser } from '../../store/user';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.THANK_YOU,
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(fetchUser());
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
    })
  },

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const ThankYou = require('./containers/ThankYouContainer').default;
      const reducer = require('./modules/thankYou').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'ThankYou', reducer });

      /*  Return getComponent   */
      cb(null, ThankYou);

    /* Webpack named bundle   */
    }, 'ThankYou');
  },
});