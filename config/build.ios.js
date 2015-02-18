var webpack = require('reapp-pack/webpack');
var webpackCallback = require('reapp-pack/lib/callback');
var webpackConfig = require('./build.ios.config.js');

webpack(webpackConfig, webpackCallback({ debug: true }));