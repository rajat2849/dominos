import { connect } from 'react-redux';

import NewsAndUpdates from '../components/NewsAndUpdates';
import { getNewsAndUpdates, setShowNewsDetail, resetProps } from '../modules/newsAndUpdates';


const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
    fetching: state.NewsAndUpdates.fetching,
    error: state.NewsAndUpdates.error,
    news: state.NewsAndUpdates.news,
    showNewsDetail: state.NewsAndUpdates.showNewsDetail,
    post_id: state.NewsAndUpdates.post_id,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
	getNewsAndUpdates: () => dispatch(getNewsAndUpdates()),
	setShowNewsDetail: (post_id) => dispatch(setShowNewsDetail(post_id)),
	resetProps: (post_id) => dispatch(resetProps()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsAndUpdates);
