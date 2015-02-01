var React = require('react');
var LoadingIcon = require('./LoadingIcon');

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
          color: 'rgba(0,0,0,0.2)'
        }} {...this.props}
      />
    );
  }
});