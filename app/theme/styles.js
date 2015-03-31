import { makeStyles } from 'reapp-kit';

export default makeStyles(name => require('./styles/' + name), [
  'Button',
  'Dots',
  'TitleBar'
]);