var Run = require('reapp-routes/react-router/run');
var Reapp = require('reapp-platform');
var Routes = require('./routes');

require('./theme/theme');

Reapp.initTouch();

// run the app
if (Reapp.Env.CLIENT)
  Run.renderAsync(Routes);
else
  Run.renderSync(Routes);

// lets inject some commonly used stuff
module.exports = {
  React: require('react'),
  Component: require('./component'),
  Actions: require('./actions'),
  Stores: require('./stores')
};