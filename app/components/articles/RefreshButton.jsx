var React = require('react');
var Icon = require('reapp-ui/components/Icon');
var Button = require('reapp-ui/components/Button');
var AnimationLoop = require('reapp-ui/helpers/AnimationLoop');

module.exports = React.createClass({
  render() {
    return (
      <Button
        {...this.props}
        chromeless
        icon={
          <AnimationLoop animation="rotate" active={this.props.rotate}>
            <Icon
              name="arrow-refresh"
              size={24}
              stroke={1}
              isInTitleBar />
          </AnimationLoop>
        } />
    );
  }
});