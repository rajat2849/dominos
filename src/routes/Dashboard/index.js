import { injectReducer } from '../../store/reducers';
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
  path: Url.DASHBOARD,
  onEnter: (nextState, replace) => {
    checkPageRestriction(nextState, replace, () => {
      store.dispatch(initializeApp());
      store.dispatch(setSiteLanguage());
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default;
      const reducer = require('./modules/dashboard').default;
      injectReducer(store, { key: 'Dashboard', reducer });
      cb(null, Dashboard);
    }, 'Dashboard');
  },
});

