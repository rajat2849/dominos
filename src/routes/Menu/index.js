import { injectReducer } from '../../store/reducers';
import { checkPageRestriction } from '../index';
import { initializeApp, setSiteLanguage } from '../../store/app';

export default (store) => ({
  path: 'menu',
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
      const Menu = require('./containers/MenuContainer').default;
      const reducer = require('./modules/menu').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'Menu', reducer });

      /*  Return getComponent   */
      cb(null, Menu);

    /* Webpack named bundle   */
    }, 'Menu');
  },
});
