var React = require('react/addons');
var ReactRouter = require('react-router');
var Animated = require('reapp-ui/mixins/Animated');

module.exports = {
  global: [
    Animated(),
    {
      shouldComponentUpdate(nextProps, nextState) {
        if (this.isAnimating())
          return true;
        else
          return React.addons.PureRenderMixin;
      }
    }
  ],
  shared: {
    'RouteState': ReactRouter.State,
    'RouteHandler': ReactRouter.RouteHandlerMixin,
    'Navigation': ReactRouter.Navigation
  }
};