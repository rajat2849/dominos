import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.VERIFY_PAGE,
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Verify = require('./containers/VerifyContainer').default;
      const reducer = require('./modules/verify').default;
      injectReducer(store, { key: 'Verify', reducer });
      cb(null, Verify);
    }, 'Verify');
  },
});