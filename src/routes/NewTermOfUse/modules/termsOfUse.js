import axios from 'axios';

import { Config } from 'config/Config';
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_TERMS_OF_USE = 'FETCHING_TERMS_OF_USE';
export const RECEIVED_TERMS_OF_USE = 'RECEIVED_TERMS_OF_USE';
export const TERMS_OF_USE_ERROR = 'TERMS_OF_USE_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingTermsOfUse(status) {
	return {
		type: FETCHING_TERMS_OF_USE,
		fetching: status
	}
}

export function receivedTermsOfUse(termsOfUse) {
	return {
		type: RECEIVED_TERMS_OF_USE,
		termsOfUse: termsOfUse
	}
}

export function termsOfUseError(status) {
	return {
		type: TERMS_OF_USE_ERROR,
		error: status
	}
}


// ------------------------------------
// Action creators
// ------------------------------------
export const fetchTermsOfUse = () => {
	return (dispatch) => {
		dispatch(fetchingTermsOfUse(true));
		let url = `${Config.url}getTermOfUse`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let termsOfUse = {};
      if(typeof response.data.data !== 'undefined') {
        termsOfUse = response.data.data;
      }
      dispatch(receivedTermsOfUse(termsOfUse));
      dispatch(fetchingTermsOfUse(false));
    }).catch( error => {
      dispatch(termsOfUseError(true));
    });
	}
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[FETCHING_TERMS_OF_USE]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_TERMS_OF_USE]: (state, action) => {
    return {
      ...state,
      termsOfUse: action.termsOfUse
    };
  },
  [TERMS_OF_USE_ERROR]: (state, action) => {
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
	termsOfUse: {}
};

export default function TermConditionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
