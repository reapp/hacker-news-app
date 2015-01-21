var webpackConfig = require('./config/build.config.js');

// webpack-dev-server
webpackServer(webpackConfig, {
  debug: true,
  port: 3011,
  dir: __dirname
});