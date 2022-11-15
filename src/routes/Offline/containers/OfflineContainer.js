import { connect } from 'react-redux';
import Offline from '../components/Offline';

const mapDispatchToProps = (dispatch) => {
  return ({

  });
};

const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Offline);
