import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
  path: `${Url.SPECIAL_OFFERS}`,
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
      const Sides = require('./containers/offersContainer').default;
      const reducer = require('./modules/specialoffers').default;

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'SpecialOffers', reducer });

      /*  Return getComponent   */
      cb(null, Sides);

    /* Webpack named bundle   */
    }, 'SpecialOffers');
  },
});