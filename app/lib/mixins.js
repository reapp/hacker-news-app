var { ParentRouteMixin } = require('reapp-routes/react-router');
var shouldupdate = require('omniscient/shouldupdate');
var Animated = require('reapp-ui/mixins/Animated');

module.exports = {
  global: [
    Animated,
    {
      shouldComponentUpdate(nextProps, nextState) {
        return this.isAnimatingSafe('viewList') ?
          true :
          shouldupdate.call(this, nextProps, nextState);
      }
    }
  ],
  shared: {
    'RouteHandler': ParentRouteMixin
  }
};