import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.LOGIN_PAGE,
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers/LoginContainer').default;
      const reducer = require('./modules/login').default;
      injectReducer(store, { key: 'Login', reducer });
      cb(null, Login);
    }, 'Login');
  },
});