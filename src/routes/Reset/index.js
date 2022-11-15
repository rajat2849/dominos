import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index';
import { initializeApp, setSiteLanguage } from '../../store/app';

export default (store) => ({
  path: 'customer/account/changeforgotten/',
  onEnter: (nextState, replace) => {
    store.dispatch(initializeApp());
    store.dispatch(setSiteLanguage());
  },

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Reset = require('./containers/ResetContainer').default;
      const reducer = require('./modules/reset').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'Reset', reducer });

      /*  Return getComponent   */
      cb(null, Reset);

    /* Webpack named bundle   */
    }, 'Reset');
  },
});
