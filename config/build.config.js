var Pack = require('reapp-pack');

module.exports = function(dir) {
  Pack.makeConfig({
    dir: path.join(__dirname, '..'),
    linkModules: true,
    entry: './app/app.js',
    devtool: 'source-map',
    target: 'web',
    debug: true
  });
}