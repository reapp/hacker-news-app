var pack = require('reapp-pack');
var path = require('path');

module.exports = pack({
  dir: path.join(__dirname, '..'),
  linkModules: true,
  entry: './app/app.js',
  devtool: 'source-map',
  target: 'web',
  env: 'production',
  hot: true,
  server: true,
  port: 3011,
  debug: true
});