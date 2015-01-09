var UI = require('reapp-ui');
var iOS = require('reapp-ui/themes/ios');

require('reapp-ui/themes/ios/stylesheets');

UI.addConstants(
  require('./constants'),
  iOS.constants.components
);

UI.addStyles(
  iOS.styles,
  require('./styles')
);

UI.addAnimations(
  iOS.animations
);