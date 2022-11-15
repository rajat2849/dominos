// ------------------------------------
// Constants
// ------------------------------------
export const SET_SELECT_EXTENSION = 'SET_SELECT_EXTENSION';

// ------------------------------------
// Actions
// ------------------------------------

export function setSelectExtension(extension) {
  return {
    type: SET_SELECT_EXTENSION,
    selectedExtension: extension
  };
}

// ------------------------------------
// Action creators
// ------------------------------------

export const setMobileExtension = (extension) => {
  return (dispatch) => {
    dispatch(setSelectExtension(extension));
  };
};

export const actions = {
  setMobileExtension
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SELECT_EXTENSION]: (state, action) => {
    return {
      ...state,
      selectedExtension: action.selectedExtension
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selectedExtension: ''
};

export default function customerDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
