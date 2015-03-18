var React = require('react');
var Mixins = require('./lib/mixins');
var component = require('reapp-component')();

// decorate all classes
component.addDecorator(spec => {
  spec = mixinMixins(spec);
  spec.contextTypes = Object.assign({ router: React.PropTypes.func }, spec.contextTypes);
  return React.createClass(spec);
});

function mixinMixins(spec) {
  // mixin string based
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin => typeof mixin === 'string' ?
      Mixins.shared[mixin] : mixin);

  // mixin globals
  spec.mixins = [].concat(spec.mixins, Mixins.global);
  return spec;
}

module.exports = component;