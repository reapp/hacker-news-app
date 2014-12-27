var { route, routes } = require('reapp-platform/react-router-routes');

module.exports = routes(require,
  route('articles', '/',
    route('article', '/article/:id', { addHandlerKey: true }),
    route('user', '/user/:id', { addHandlerKey: true })
  )
);