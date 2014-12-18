var React = require('react');
var { Route, DefaultRoute } = require('react-router');
var { route, routes } = require('reapp-route-tree');

module.exports = generate(routes({
    dir: 'components/'
  },
  route({ name: 'articles', path: '/' },
    route({ name: 'article', path: '/article/:id', addHandlerKey: true }),
    route({ name: 'user', path: '/user/:id', addHandlerKey: true })
  )
));

function generate(props) {
  props.children = props.children ? props.children.map(generate) : null;
  props.handler = require(props.handlerPath);

  return props.defaultRoute ?
    <DefaultRoute {...props} /> :
    <Route {...props} />;
}