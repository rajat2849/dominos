import ReactGA from "react-ga";
import _ from "lodash";

import { Config } from "../config/Config";
import { getSessionStorage, saveSessionStorage } from "components/Helpers";

ReactGA.initialize(Config.GoogleAnalyticsKey);

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_PAGE_TRACKING = "REQUEST_PAGE_TRACKING";
export const PAGE_TRACKING_SUCCESS = "PAGE_TRACKING_SUCCESS";

// ------------------------------------
// Actions
// ------------------------------------
export function requestPageTracking() {
  return {
    type: REQUEST_PAGE_TRACKING
  };
}

export function pageTracked() {
  return {
    type: PAGE_TRACKING_SUCCESS
  };
}

export const pageTracking = () => {
  return dispatch => {
    dispatch(requestPageTracking());
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    dispatch(pageTracked());
  };
};

export const actions = {
  pageTracking
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_PAGE_TRACKING]: (state, action) => {
    return {
      ...state
    };
  },
  [PAGE_TRACKING_SUCCESS]: (state, action) => {
    return {
      ...state
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};

export default function googleAnalyticsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
