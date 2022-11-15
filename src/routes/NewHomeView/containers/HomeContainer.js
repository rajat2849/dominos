import { connect } from 'react-redux';
import HomeView from '../components/HomeView';
import { splashScreen } from '../modules/home';

import { setLanguage } from'redux-i18n';

const mapStateToProps = (state) => {
  return({
    lang: state.i18nState.lang,
    app: state.app.app,
    showSplash: state.Home.showSplash
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    setLanguage: (lang) => dispatch(setLanguage(lang)),
    splashScreen: (status) => dispatch(splashScreen(status))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
