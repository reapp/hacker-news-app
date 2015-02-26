module.exports = {
  linkModules: true,
  entry: './app/app.js',
  devtool: 'none',
  target: 'web',
  debug: true,
  env: 'production',
  minify: true,
  separateStylesheet: true
};