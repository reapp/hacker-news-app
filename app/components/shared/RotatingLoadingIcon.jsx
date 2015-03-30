var React = require('react');
var LoadingIcon = require('./LoadingIcon');
var theme = require('theme');

module.exports = React.createClass({
  render() {
    return (
      <LoadingIcon active={true} styles={
        {
          self: {
            width: 24,
            margin: 'auto',
          }
        }}
        iconProps={{
          color: theme.constants.mid
        }}
        {...this.props}
      />
    );
  }
});