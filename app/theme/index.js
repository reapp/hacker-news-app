import { theme } from 'reapp-kit';
import iOS from 'reapp-ui/themes/ios';

import './theme.css';

import base from './constants/base';
import components from './constants/components';
import styles from './styles';

theme({
  constants: [iOS.constants.base, base, iOS.constants.components, components],
  styles: [iOS.styles, styles],
  animations: [iOS.animations]
});