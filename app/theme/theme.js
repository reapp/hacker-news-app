var UI = require('reapp-ui');
var iOS = require('reapp-ui/themes/ios');

require('reapp-ui/themes/ios/stylesheets');
require('./theme.css');

UI.addConstants(
  iOS.constants.base,
  require('./constants/base'),
  iOS.constants.components,
  require('./constants/components')
);

UI.addStyles(
  iOS.styles,
  require('./styles')
);

UI.addAnimations(
  iOS.animations
);

module.exports = UI;