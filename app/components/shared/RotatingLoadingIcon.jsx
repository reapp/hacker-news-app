var React = require('react');
var LoadingIcon = require('./LoadingIcon');
var Theme = require('theme/theme');

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
          color: Theme.getConstants('mid')
        }}
        {...this.props}
      />
    );
  }
});