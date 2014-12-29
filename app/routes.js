var { route, routes } = require('reapp-routes/react-router/generator');

module.exports = routes(require,
  route('articles', '/',
    route('article', '/article/:id', { addHandlerKey: true }),
    route('user', '/user/:id', { addHandlerKey: true })
  )
);