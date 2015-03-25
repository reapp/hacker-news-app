var React = require('react');
var Mixins = require('./lib/mixins');
var component = require('reapp-component')();

// decorate all classes
component.addDecorator(spec => {
  // add mixins
  spec = mixinMixins(spec);

  // add context
  spec.contextTypes = Object.assign({
    router: React.PropTypes.func,
    animations: React.PropTypes.object
  }, spec.contextTypes);

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