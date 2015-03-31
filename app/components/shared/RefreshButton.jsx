import { React, Button } from 'reapp-kit';

import LoadingIcon from './LoadingIcon';

export default class extends React.Component {
  render() {
    return (
      <Button {...this.props} chromeless
        icon={
          <LoadingIcon active={this.props.rotate} />
        }
      />
    );
  }
}