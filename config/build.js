var webpack = require('reapp-pack/webpack');
var webpackCallback = require('reapp-pack/lib/callback');
var webpackConfig = require('./build.config.js');

webpack(webpackConfig, webpackCallback);