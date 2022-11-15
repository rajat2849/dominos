import { connect } from 'react-redux';
import Policy from '../components/Policy';

import { fetchPrivacyPolicy } from '../modules/policy';


const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
    fetching: state.Policy.fetching,
    error: state.Policy.error,
    policy: state.Policy.policy
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchPrivacyPolicy: () => dispatch(fetchPrivacyPolicy())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
