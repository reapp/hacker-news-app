var Run = require('reapp-routes/react-router/run');
var Reapp = require('reapp-platform');
var Routes = require('./routes');
var { Promise } = require('bluebird');

// lets globalize bluebird
window.Promise = Promise;

// import our theme
require('./theme/theme');

// setup some stuff
// Promise.longStackTraces();
Reapp.initTouch();

// run the app
if (Reapp.Env.CLIENT)
  Run.renderAsync(Routes);
else
  Run.renderSync(Routes);