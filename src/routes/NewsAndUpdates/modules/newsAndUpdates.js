import axios from 'axios';

import { Config } from 'config/Config';
// ------------------------------------
// Constants
// ------------------------------------
export const FETCHING_NEWS_AND_UPDATES = 'FETCHING_NEWS_AND_UPDATES';
export const RECEIVED_NEWS_AND_UPDATES = 'RECEIVED_NEWS_AND_UPDATES';
export const NEWS_AND_UPDATES_ERROR = 'NEWS_AND_UPDATES_ERROR';
export const SHOW_NEWS_DETAIL = 'SHOW_NEWS_DETAIL';
export const SET_POST_ID = 'SET_POST_ID';
export const RESET_NEWS_AND_UPDATE_PROPS = 'RESET_NEWS_AND_UPDATE_PROPS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchingNewsAndUpdates(status) {
	return {
		type: FETCHING_NEWS_AND_UPDATES,
		fetching: status
	}
}

export function receivedNewsAndUpdates(news) {
	return {
		type: RECEIVED_NEWS_AND_UPDATES,
		news: news
	}
}

export function newsAndUpdatesError(status) {
	return {
		type: NEWS_AND_UPDATES_ERROR,
		error: status
	}
}

export function showNewsDetail(status) {
  return {
    type: SHOW_NEWS_DETAIL,
    showNewsDetail: status
  }
}

export function setPostId(post_id) {
  return {
    type: SET_POST_ID,
    post_id: post_id
  }
}

export function resetNewsAndUpdatesProps(status) {
  return {
    type: RESET_NEWS_AND_UPDATE_PROPS,
    post_id: '',
    showNewsDetail: status
  }
}

// ------------------------------------
// Actions creator
// ------------------------------------
export const getNewsAndUpdates = () => {
	return(dispatch) => {
		dispatch(fetchingNewsAndUpdates(true));
		let url = `${Config.url}getNews`;
    axios.get(url, {
      headers: {'token': Config.token,
        'device-type': Config.devicetype,
        'Accept': Config.Accept,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( response => {
      let news = [];
      if(typeof response.data.data !== 'undefined' && response.data.data.length > 0) {
        news = response.data.data;
      }
      dispatch(receivedNewsAndUpdates(news));
      dispatch(fetchingNewsAndUpdates(false));
    }).catch( error => {
      dispatch(newsAndUpdatesError(true));
    });
	}
}

export const setShowNewsDetail = (post_id) => {
  return (dispatch) => {
    dispatch(showNewsDetail(true));
    dispatch(setPostId(post_id));
  }
}

export const resetProps = () => {
  return (dispatch) => {
    dispatch(resetNewsAndUpdatesProps(false));
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[FETCHING_NEWS_AND_UPDATES]: (state, action) => {
    return {
      ...state,
      fetching: action.fetching
    };
  },
  [RECEIVED_NEWS_AND_UPDATES]: (state, action) => {
    return {
      ...state,
      news: action.news
    };
  },
  [NEWS_AND_UPDATES_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error
    };
  },
  [SHOW_NEWS_DETAIL]: (state, action) => {
    return {
      ...state,
      showNewsDetail: action.showNewsDetail
    };
  },
  [SET_POST_ID]: (state, action) => {
    return {
      ...state,
      post_id: action.post_id
    };
  },
  [RESET_NEWS_AND_UPDATE_PROPS]: (state, action) => {
    return {
      ...state,
      post_id: action.post_id,
      showNewsDetail: action.showNewsDetail
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	fetching: false,
	error: false,
	news: [],
  post_id: '',
  showNewsDetail: false
};

export default function newsAndUpdatesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
