var Pack = require('reapp-pack');
var path = require('path');

module.exports = Pack.makeConfig({
  dir: path.join(__dirname, '..'),
  linkModules: true,
  entry: './app/app.js',
  devtool: 'eval',
  target: 'web',
  server: true,
  port: 3011,
  debug: true
});