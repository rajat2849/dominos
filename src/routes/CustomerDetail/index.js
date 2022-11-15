import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index'
import { fetchUser } from '../../store/user';
import { initializeApp, setSiteLanguage } from '../../store/app';

export default (store) => ({
  path: 'customerDetail',
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
      const CustomerDetail = require('./containers/CustomerDetailContainer').default;
      const reducer = require('./modules/customerDetail').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'CustomerDetail', reducer });

      /*  Return getComponent   */
      cb(null, CustomerDetail);

    /* Webpack named bundle   */
    }, 'customerDetail');
  },
});
