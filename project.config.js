const NODE_ENV = process.env.NODE_ENV || 'development';

const API = JSON.stringify({
  // url: 'http://newdev.onlinedominosid.com/infdominos/api/',
  url: 'https://migrationdev.dominos.id/infdominos/api/',
  // url: "https://www.dominos.co.id/infdominos/api/",
  pgurl: 'https://migrationdev.dominos.id/',
  //pgurl: 'https://www.dominos.co.id/'
});

const GoogleAnalytics = JSON.stringify({
  API_KEY: 'UA-44787781-6'
});

const GoogleAPI = JSON.stringify({
  MAP_KEY: 'AIzaSyDyiBm2roWPUJ7G1DNQJFnC4ttcWMdXdNQ'
});

const DANA = JSON.stringify({
  url: 'https://m.dominos.co.id/'
});

const Facebook = JSON.stringify({
  APP_ID: '1927245187551328'
});

const FacebookPixel = JSON.stringify({
  PIXEL_ID: '1927245187551328' //"415467588810386"
});

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {
    API,
    DANA,
    GoogleAnalytics,
    GoogleAPI,
    Facebook,
    FacebookPixel
  },
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router',
  ]
};
