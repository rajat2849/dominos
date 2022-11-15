import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.ERROR_PAGE,
  onEnter: (nextState, replace) => {
    console.log('checking component auth')
    store.dispatch(initializeApp());
    store.dispatch(setSiteLanguage());
  },

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Error = require('./containers/ErrorContainer').default;
      const reducer = require('./modules/error').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'Error', reducer });

      /*  Return getComponent   */
      cb(null, Error);

    /* Webpack named bundle   */
    }, 'Error');
  },
});
