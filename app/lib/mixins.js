var ReactRouter = require('react-router');
var shouldupdate = require('omniscient/shouldupdate');
var Animated = require('reapp-ui/mixins/Animated');

module.exports = {
  global: [
    Animated(),
    {
      shouldComponentUpdate(nextProps, nextState) {
        return this.isAnimating('viewList') ?
          true :
          shouldupdate.call(this, nextProps, nextState);
      }
    }
  ],
  shared: {
    'RouteState': ReactRouter.State,
    'RouteHandler': ReactRouter.RouteHandlerMixin,
    'Navigation': ReactRouter.Navigation
  }
};