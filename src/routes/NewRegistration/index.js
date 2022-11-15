import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.REGISTER_PAGE,
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Register = require('./containers/RegisterContainer').default;
      const reducer = require('./modules/register').default;
      injectReducer(store, { key: 'Register', reducer });
      cb(null, Register);
    }, 'Register');
  },
});