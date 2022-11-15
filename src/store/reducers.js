import { combineReducers } from 'redux';
import locationReducer from './location';
import userReducer from './user';
import cartReducer from './cart';
import appReducer from './app';
import findStoreReducer from './findStore';
import { reducer as formReducer } from 'redux-form';
import myCartReducer from './newcart';
import newToppingsReducer from './toppings';
import { i18nState } from "redux-i18n"
import ViewCartReducer from '../routes/ViewCart/modules/ViewCart';
import Menu from '../routes/Menu/modules/menu';
import ServiceMethod from '../routes/NewServiceMethod/modules/servicemethod';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    user: userReducer,
    cart: cartReducer,
    app: appReducer,
    findStore: findStoreReducer,
    i18nState: i18nState,
    myCart: myCartReducer,
    myToppings:newToppingsReducer,
    viewCart : ViewCartReducer,
    menu : Menu,
    ServiceMethod : ServiceMethod,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;