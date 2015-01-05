var React = require('react');
var Component = require('reapp-component');
var Mixins = require('./lib/mixins');

var component = Component();

// add global and string based mixins
component.addDecorator(spec => {
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin => typeof mixin === 'string' ?
      Mixins.shared[mixin] : mixin);

  spec.mixins = [].concat(spec.mixins, Mixins.global);
  return React.createClass(spec);
});

module.exports = component;