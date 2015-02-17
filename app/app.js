var { Promise } = require('bluebird');
window.Promise = Promise;
Promise.longStackTraces();

require('reapp-ui');
require('reapp-platform');

// for demo
require('reapp-ui/lib/desktopTouch');

var Router = require('reapp-routes/react-router');
var Routes = require('./routes');

// import our theme
require('./theme/theme');

// run the app
Router(Routes);