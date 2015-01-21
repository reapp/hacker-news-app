var webpack = require('reapp-pack/webpack');
var path = require('path');

var dir = path.join(__dirname, '..');
var webpackConfig = require('./build.config.js')(dir);

// webpack-dev-server
webpack(webpackConfig, {
  debug: true,
  port: 3011,
  dir: dir
});