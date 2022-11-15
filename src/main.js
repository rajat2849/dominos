import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import './styles/main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TagManager from 'react-gtm-module';
// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__);

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const App = require('./components/App').default;
  const routes = require('./routes/index').default(store);
  const MatrialDesign = () => (
    <MuiThemeProvider muiTheme={getMuiTheme('lightBaseTheme')}>
      <App store={store} routes={routes} />
    </MuiThemeProvider>
  );
  ReactDOM.render(
    <MatrialDesign />,
    MOUNT_NODE
  );
};

// Development Tools
// ------------------------------------
if (__DEV__) {
  // console.log('#####################################################################');
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render();