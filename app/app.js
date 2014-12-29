var React = require('react');
var Run = require('reapp-routes/react-router/run');
var Reapp = require('reapp-platform');
var Env = Reapp.env;
var Routes = require('./routes');

require('./theme/theme');

Reapp.initTouch();

// if (Env.CLIENT && Env.PRODUCTION)
//   require('reapp-raf-batching');

if (Env.CLIENT)
  Run.renderAsync(Routes);
else
  Run.renderSync(Routes);