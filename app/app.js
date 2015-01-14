var Router = require('reapp-routes/react-router');
var Routes = require('./routes');
var { Promise } = require('bluebird');

// import our theme
require('./theme/theme');

// run the app
Router.run(Routes);