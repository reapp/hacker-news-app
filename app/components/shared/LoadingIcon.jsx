import { React, Icon, AnimationLoop } from 'reapp-kit';

export default class extends React.Component {
  render() {
    return (
      <AnimationLoop animation="rotate" {...this.props}>
        <Icon
          file={require('reapp-kit/icons/arrow-refresh.svg')}
          size={24}
          stroke={1}
          styles={{
            self: {
              marginTop: -1
            }
          }}
          {...this.props.iconProps}
        />
      </AnimationLoop>
    );
  }
}