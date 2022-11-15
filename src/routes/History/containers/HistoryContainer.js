import { connect } from 'react-redux';
import History from '../components/History';

const mapDispatchToProps = (dispatch) => {
  return ({

  });
};

const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
