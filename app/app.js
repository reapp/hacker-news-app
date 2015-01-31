require('reapp-ui');
require('reapp-platform');
require('./lib/phantom');

var Router = require('reapp-routes/react-router');
var Routes = require('./routes');

// import our theme
require('./theme/theme');

// run the app
Router(Routes);