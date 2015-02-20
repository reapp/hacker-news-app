require('reapp-ui');
require('reapp-platform');

// for demo
require('reapp-ui/lib/desktopTouch');

var Router = require('reapp-routes/react-router');
var Routes = require('./routes');

// import our theme
require('./theme/theme');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;
else
  console.log(window.cordova)

// run the app
Router(Routes);