var server = require('reapp-server');
var webpackServer = require('reapp-pack/webpackServer');
var makeLayout = require('reapp-pack/lib/makeLayout');
var path = require('path');
var webpackConfig = require('./run.config.js');
var dir = path.join(__dirname, '..');

var layout = makeLayout({
  template: dir + '/assets/layout.html',
  port: 3011,
  scripts: Object.keys(webpackConfig.entry)
})

// express server
server({
  dir: dir,
  template: layout,
  debug: true,
  port: 3010
});

// webpack-dev-server
webpackServer(webpackConfig, {
  debug: true,
  port: 3011,
  dir: dir,
  hot: true
});