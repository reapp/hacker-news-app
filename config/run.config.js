var Pack = require('reapp-pack');

module.exports = function(dir) {
  return Pack.makeConfig({
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
}