var server = require('reapp-server');
var webpackServer = require('reapp-pack/webpackServer');
var webpackConfig = require('./config/run.config.js');

// express server
server({
  dir: __dirname,
  scripts: Object.keys(webpackConfig.entry),
  layout: __dirname + '/assets/layout.html',
  debug: true,
  port: 3010,
  wport: 3011
});

// webpack-dev-server
webpackServer(webpackConfig, {
  debug: true,
  port: 3011,
  dir: __dirname
});