var pack = require('reapp-pack');
var path = require('path');
var dir = path.join(__dirname, '..');

module.exports = pack({
  dir: dir,
  linkModules: true,
  entry: './app/app.js',
  devtool: 'eval',
  target: 'web',
  hot: true,
  server: true,
  port: 3011,
  debug: true
});