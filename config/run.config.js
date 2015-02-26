module.exports = {
  linkModules: true,
  entry: './app/app.js',
  devtool: 'source-map',
  target: 'web',
  env: 'development',
  hot: true,
  server: true,
  port: 3011,
  debug: true
};