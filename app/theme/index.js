import UI from 'reapp-ui';
import iOS from 'reapp-ui/themes/ios';

import 'reapp-ui/themes/ios/stylesheets';
import './theme.css';

import base from './constants/base';
import components from './constants/components';
import styles from './styles';

UI.addConstants(
  iOS.constants.base, base,
  iOS.constants.components, components
);

UI.addStyles(iOS.styles, styles);
UI.addAnimations(iOS.animations);

export default UI;