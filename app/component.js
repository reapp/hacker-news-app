var React = require('react');
var ReappComponent = require('reapp-platform/component');
var Reapp = require('reapp-platform');
var Mixins = require('./mixins');

var Component = ReappComponent();

// statics
Component.addStatics('stores', require('./stores'));
Component.addStatics('actions', require('./actions'));
Component.addStatics('mixins', Reapp.mixins);
Component.addStatics('helpers', Reapp.helpers);

// add global and string based mixins
Component.addDecorator(spec => {
  if (spec.mixins)
    spec.mixins.map(mixin => typeof mixin === 'string' ?
      Mixins.shared[mixin] : mixin);

  spec.mixins = [].concat(spec.mixins, Mixins.global);
  return React.createClass(spec);
});

module.exports = Component;