// ------------------------------------
// Constant
// ------------------------------------
export const SHOW_SPLASH_SCREEN = 'SHOW_SPLASH_SCREEN';

// ------------------------------------
// Actions
// ------------------------------------
export function showSplashScreen (status) {
  return {
    type: SHOW_SPLASH_SCREEN,
    showSplash: status
  };
}

// ------------------------------------
// Action creators
// ------------------------------------
export const splashScreen = (status) => {
  return (dispatch) => {
    dispatch(showSplashScreen(status));
  }
}

// ------------------------------------
// Action handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_SPLASH_SCREEN]: (state, action) => {
    return {
      ...state,
      showSplash: action.showSplash
    };
  }
}

export const action = {
  splashScreen
};
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  showSplash: false
};

export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
