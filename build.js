var webpack = require('reapp-pack/webpack');
var webpackConfig = require('./config/build.config.js');

// webpack-dev-server
webpack(webpackConfig, {
  debug: true,
  port: 3011,
  dir: __dirname
});