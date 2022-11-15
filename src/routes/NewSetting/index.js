import { injectReducer } from "../../store/reducers";
import { initializeApp, setSiteLanguage } from '../../store/app';
import { checkPageRestriction } from '../index';
import { Url } from '../../config/Config';

export default (store) => ({
    path: Url.NEW_SETTING,
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
            const Setting = require("./containers/SettingContainer").default;
            const reducer = require("./modules/setting").default;

            /*  Add the reducer to the store on key 'login'  */
            injectReducer(store, { key: "Setting", reducer });

            /*  Return getComponent   */
            cb(null, Setting);

            /* Webpack named bundle   */
        }, "Setting");
    },
});
