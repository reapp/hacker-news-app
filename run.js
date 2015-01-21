var server = require('reapp-server');
var webpackServer = require('reapp-pack/webpackServer');
var Pack = require('reapp-pack');

var webpackConfig = Pack.makeConfig({
  dir: __dirname,
  entry: './app/app.js',
  devtool: 'eval',
  target: 'web',
  server: true,
  port: 3011,
  debug: true
});

var serverConfig = {
  dir: __dirname,
  scripts: Object.keys(webpackConfig.entry),
  layout: __dirname + '/assets/layout.html',
  debug: true,
  port: 3010,
  wport: 3011
};

console.log('wpServerConfig', webpackConfig);
console.log('expressConfig', serverConfig);

Pack.linkModules(__dirname + '/server_modules');
server(serverConfig);
webpackServer(webpackConfig, {
  debug: true,
  port: 3011,
  dir: __dirname
});