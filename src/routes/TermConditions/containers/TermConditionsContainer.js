import { connect } from 'react-redux';
import TermConditions from '../components/TermConditions';

import { fetchTermAndConditions } from '../modules/termConditions';


const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
    fetching: state.TermCondition.fetching,
    error: state.TermCondition.error,
    termConditions: state.TermCondition.termConditions
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchTermAndConditions: () => dispatch(fetchTermAndConditions())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(TermConditions);
