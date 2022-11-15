import React from "react";
import { browserHistory, Router } from "react-router";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import I18n from "redux-i18n";

import { translations } from "../translations";
// import { pageTracking } from '../store/googleAnalytics';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  logPageView() {
    window.scrollTo(0, 0);
    // this.props.store.dispatch(pageTracking(window.location.pathname));
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <I18n translations={translations} fallbackLang="en" initialLang="id">
          <div style={{ height: "100%" }}>
            <Router
              onUpdate={() => this.logPageView()}
              history={browserHistory}
              children={this.props.routes}
            />
          </div>
        </I18n>
      </Provider>
    );
  }
}

export default App;
