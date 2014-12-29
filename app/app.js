var Run = require('reapp-routes/react-router/run');
var Reapp = require('reapp-platform');
var Routes = require('./routes');

require('./theme/theme');

Reapp.initTouch();

// if (Env.CLIENT && Env.PRODUCTION)
//   require('reapp-raf-batching');

if (Reapp.env.CLIENT)
  Run.renderAsync(Routes);
else
  Run.renderSync(Routes);