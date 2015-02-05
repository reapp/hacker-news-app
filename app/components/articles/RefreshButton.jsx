var React = require('react');
var Button = require('reapp-ui/components/Button');
var LoadingIcon = require('components/shared/LoadingIcon');

module.exports = React.createClass({
  render() {
    return (
      <Button
        {...this.props}
        chromeless
        icon={
          <LoadingIcon active={this.props.rotate} iconProps={{isInTitleBar: true}} />
        } />
    );
  }
});