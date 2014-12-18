var UI = require('reapp-ui');
var iOSTheme = require('reapp-ui/themes/ios/all');

UI.setup('constants', iOSTheme.constants);
UI.setup('constants', require('./constants'));

UI.setup('styles', iOSTheme.styles);
UI.setup('styles', require('./styles'));

UI.setup('animations', iOSTheme.animations);