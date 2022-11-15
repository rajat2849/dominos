import { getLocalStorage } from '../components/Helpers';
import { setLanguage } from 'redux-i18n';
import { DEFAULT_SITE_LANGUAGE } from '../config/Config';

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const ALERT_DIALOG = 'ALERT_DIALOG';
export const LOADING_IMAGE = 'LOADING_IMAGE';
export const PRODUCT_CATEGORY_COMP_STATUS = 'PRODUCT_CATEGORY_COMP_STATUS';

// ------------------------------------
// Actions
// ------------------------------------
export function initialisingApp(status, data) {
  return {
    type: INITIALIZE_APP,
    initializing: status,
    payload: data
  };
}

export function alertPopUp (payload) {
  return {
    type: ALERT_DIALOG,
    alertDialog: payload
  };
}

export function showLoadingImage (status) {
  return {
    type: LOADING_IMAGE,
    loader: status
  }
}

export function setProductCategoryCompStatus (status) {
  return {
    type: PRODUCT_CATEGORY_COMP_STATUS,
    showProductCategoryComp: status
  }
}
// ------------------------------------
// Actions creators
// ------------------------------------
export const initializeApp = () => {
  return (dispatch) => {
    dispatch(initialisingApp(true, {}));
    const cart = getLocalStorage('cart');
    let cartItemCount = 0;
    if ( cart.length > 0 ) {
      cartItemCount = cart.length;
    }
    let data = {
      cartItemCount: cartItemCount,
    };
    dispatch(initialisingApp(false, data));
  };
};

export const alertDialog = (payload) => {
  return (dispatch) => {
    dispatch(alertPopUp(payload));
  };
};

export const loadingImage = (status) => {
  return (dispatch) => {
    dispatch(showLoadingImage(status));
  }
}

export const setSiteLanguage = (lang) => {
  return (dispatch, getState) => {
    let siteLang = getLocalStorage('siteLanguage');
    if (typeof siteLang === 'undefined' || siteLang === '') {
      siteLang = DEFAULT_SITE_LANGUAGE;
    }
    dispatch(setLanguage(siteLang));
  }
}

export const mountProductCategoryList = (status) => {
  return(dispatch) => {
    dispatch(setProductCategoryCompStatus(status));
  }
}

export const actions = {
  initializeApp,
  alertDialog,
  loadingImage,
  setSiteLanguage,
  mountProductCategoryList
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INITIALIZE_APP]: (state, action) => {
    return {
      ...state,
      app: action.payload,
      initializing: action.initializing
    };
  },
  [ALERT_DIALOG]: (state, action) => {
    return {
      ...state,
      alertDialog: action.alertDialog
    };
  },
  [LOADING_IMAGE]: (state, action) => {
    return {
      ...state,
      loader: action.loader
    };
  },
  [PRODUCT_CATEGORY_COMP_STATUS]: (state, action) => {
    return {
      ...state,
      showProductCategoryComp: action.showProductCategoryComp
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  app: {},
  alertDialog: {
    status: false,
    title: 'Alert',
    text: ''
  },
  initializing: false,
  loader: false,
  showProductCategoryComp: false
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
