import { makeStyles } from 'reapp-ui';

export default makeStyles(name => require('./styles/' + name), [
  'Button',
  'Dots',
  'TitleBar'
]);