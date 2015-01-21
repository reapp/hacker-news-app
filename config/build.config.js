var Pack = require('reapp-pack');
var path = require('path');

module.exports = Pack.makeConfig({
  dir: path.join(__dirname, '..'),
  linkModules: true,
  entry: './app/app.js',
  devtool: 'source-map',
  target: 'web',
  debug: true
});