var React = require('react');
var Mixins = require('./lib/mixins');
var component = require('reapp-component')();

// add global and string based mixins
component.addDecorator(spec => {
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin => typeof mixin === 'string' ?
      Mixins.shared[mixin] : mixin);

  spec.mixins = [].concat(spec.mixins, Mixins.global);
  return React.createClass(spec);
});

module.exports = component;