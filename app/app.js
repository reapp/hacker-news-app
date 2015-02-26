require('reapp-ui');
require('reapp-platform');

// for demo
require('reapp-ui/lib/desktopTouch');

// app icon
require('../assets/icon.png');

var Router = require('reapp-routes/react-router');
var Routes = require('./routes');

// import our theme
require('./theme/theme');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

// run the app
Router(Routes);