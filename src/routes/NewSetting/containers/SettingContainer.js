import { connect } from "react-redux";
import SettingForm from "../components/SettingForm";
import { setLanguage } from "redux-i18n";
import { loadingImage } from "../../../store/app";

const mapStateToProps = state => {
  return {
    lang: state.i18nState.lang,
    loader: state.app.loader
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: lang => dispatch(setLanguage(lang)),
    loadingImage: status => dispatch(loadingImage(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingForm);
