import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index'
import { initializeApp, setSiteLanguage } from '../../store/app';

export default (store) => ({
  path: '/',
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
      const Home = require('./containers/HomeContainer').default;
      const reducer = require('./modules/home').default;

      /*  Add the reducer to the store on key 'home'  */
      injectReducer(store, { key: 'Home', reducer });

      /*  Return getComponent   */
      cb(null, Home);

    /* Webpack named bundle   */
  }, 'Home');
  },
});
