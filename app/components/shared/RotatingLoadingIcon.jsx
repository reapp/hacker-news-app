import { React, theme } from 'reapp-kit';
import LoadingIcon from './LoadingIcon';

export default class extends React.Component {
  render() {
    return (
      <LoadingIcon active={true} styles={{
          self: {
            width: 24,
            margin: 'auto',
          }
        }}
        iconProps={{ color: theme().constants.mid }}
        {...this.props}
      />
    );
  }
}