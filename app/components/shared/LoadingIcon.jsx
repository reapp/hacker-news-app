var React = require('react');
var Icon = require('reapp-ui/components/Icon');
var AnimationLoop = require('reapp-ui/helpers/AnimationLoop');

module.exports = React.createClass({
  render() {
    return (
      <AnimationLoop animation="rotate" {...this.props}>
        <Icon
          name="arrow-refresh"
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
});