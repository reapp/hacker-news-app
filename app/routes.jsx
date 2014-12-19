var { route, routes } = require('reapp-route-tree/react-router');

module.exports = routes(
  path => require(path),

  route('articles', '/',
    route('article', '/article/:id', { addHandlerKey: true }),
    route('user', '/user/:id', { addHandlerKey: true })
  )
);