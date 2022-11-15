import axios from 'axios';

import { Config } from 'config/Config';
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_TERMS_CONDITIONS = 'FETCHING_TERMS_CONDITIONS';
export const RECEIVED_TERMS_CONDITIONS = 'RECEIVED_TERMS_CONDITIONS';
export const TERM_CONDITIONS_ERROR = 'TERM_CONDITIONS_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingTermAndConditions(status) {
	return {
		type: FETCHING_TERMS_CONDITIONS,
		fetching: status
	}
}

export function receivedTermAndConditions(termConditions) {
	return {
		type: RECEIVED_TERMS_CONDITIONS,
		termConditions: termConditions
	}
}

export function termAndConditionsError(status) {
	return {
		type: TERM_CONDITIONS_ERROR,
		error: status
	}
}


// ------------------------------------
// Action creators
// ------------------------------------
export const fetchTermAndConditions = () => {
	return (dispatch) => {
		dispatch(fetchingTermAndConditions(true));
		let url = `${Config.url}getTermCondition`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let termConditions = {};
      if(typeof response.data.data !== 'undefined') {
        termConditions = response.data.data;
      }
      dispatch(receivedTermAndConditions(termConditions));
      dispatch(fetchingTermAndConditions(false));
    }).catch( error => {
      dispatch(termAndConditionsError(true));
    });
	}
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[FETCHING_TERMS_CONDITIONS]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_TERMS_CONDITIONS]: (state, action) => {
    return {
      ...state,
      termConditions: action.termConditions
    };
  },
  [TERM_CONDITIONS_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	fetching: false,
	error: false,
	termConditions: {}
};

export default function TermConditionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}