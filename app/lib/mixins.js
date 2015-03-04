var ReactRouter = require('react-router');
var { PureRenderMixin } = require('react/addons').addons;
var shouldupdate = require('omniscient/shouldupdate');
var Animated = require('reapp-ui/mixins/Animated');

module.exports = {
  global: [
    Animated(),
    {
      shouldComponentUpdate(nextProps, nextState) {
        console.log(
          PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState),
          shouldupdate.call(this, nextProps, nextState)
        );
        return this.isAnimatingSafe('viewList') ?
          true :
          PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState);
      }
    }
  ],
  shared: {
    'RouteState': ReactRouter.State,
    'RouteHandler': ReactRouter.RouteHandlerMixin,
    'Navigation': ReactRouter.Navigation
  }
};