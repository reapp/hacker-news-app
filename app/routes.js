var { route, routes } = require('reapp-route-tree/react-router');

module.exports = routes(require,
  route('articles', '/',
    route('article', '/article/:id', { addHandlerKey: true }),
    route('user', '/user/:id', { addHandlerKey: true })
  )
);