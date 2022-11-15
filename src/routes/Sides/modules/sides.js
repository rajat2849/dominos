import axios from 'axios';

import { Config } from 'config/Config';
// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------



// ------------------------------------
// Action creators
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	
};

export default function SidesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
