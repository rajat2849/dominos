import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';

export default (store) => ({
  path: 'offline',
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
      const Offline = require('./containers/OfflineContainer').default;
      const reducer = require('./modules/offline').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'Order', reducer });

      /*  Return getComponent   */
      cb(null, Offline);

    /* Webpack named bundle   */
    }, 'Offline');
  },
});
