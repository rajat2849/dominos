import axios from 'axios';

import { Config } from 'config/Config';
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_PRIVACY_POLICY = 'FETCHING_PRIVACY_POLICY';
export const RECEIVED_PRIVACY_POLICY = 'RECEIVED_PRIVACY_POLICY';
export const PRIVACY_POLICY_ERROR = 'PRIVACY_POLICY_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingPrivacyPolicy(status) {
	return {
		type: FETCHING_PRIVACY_POLICY,
		fetching: status
	}
}

export function receivedPrivacyPolicy(policy) {
	return {
		type: RECEIVED_PRIVACY_POLICY,
		policy: policy
	}
}

export function privacyPolicyError(status) {
	return {
		type: PRIVACY_POLICY_ERROR,
		error: status
	}
}


// ------------------------------------
// Action creators
// ------------------------------------
export const fetchPrivacyPolicy = () => {
	return (dispatch) => {
		dispatch(fetchingPrivacyPolicy(true));
		let url = `${Config.url}getPrivacyPolicy`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let policy = {};
      if(typeof response.data.data !== 'undefined') {
        policy = response.data.data;
      }
      dispatch(receivedPrivacyPolicy(policy));
      dispatch(fetchingPrivacyPolicy(false));
    }).catch( error => {
      dispatch(privacyPolicyError(true));
    });
	}
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[FETCHING_PRIVACY_POLICY]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_PRIVACY_POLICY]: (state, action) => {
    return {
      ...state,
      policy: action.policy
    };
  },
  [PRIVACY_POLICY_ERROR]: (state, action) => {
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
	policy: {}
};

export default function TermConditionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
