import { connect } from 'react-redux';
import TermsOfUse from '../components/TermsOfUse';

import { fetchTermsOfUse } from '../modules/termsOfUse';


const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
    fetching: state.TermsOfUse.fetching,
    error: state.TermsOfUse.error,
    termsOfUse: state.TermsOfUse.termsOfUse
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchTermsOfUse: () => dispatch(fetchTermsOfUse())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
