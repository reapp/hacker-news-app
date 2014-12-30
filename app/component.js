var React = require('react');
var Component = require('reapp-platform/component');
var Reapp = require('reapp-platform');
var Mixins = require('./lib/mixins');

var component = Component();

// statics
component.addStatics('stores', require('./stores'));
component.addStatics('actions', require('./actions'));
component.addStatics('mixins', Reapp.mixins);
component.addStatics('helpers', Reapp.helpers);

// add global and string based mixins
component.addDecorator(spec => {
  if (spec.mixins)
    spec.mixins.map(mixin => typeof mixin === 'string' ?
      Mixins.shared[mixin] : mixin);

  spec.mixins = [].concat(spec.mixins, Mixins.global);
  return React.createClass(spec);
});

module.exports = component;