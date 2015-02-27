require('reapp-ui');

// for demo
require('reapp-ui/lib/desktopTouch');

var Router = require('reapp-routes/react-router');
var Routes = require('./routes');

// import our theme
require('./theme/theme');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

// run the app
Router(Routes);