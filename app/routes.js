module.exports = ({ routes, route }) =>
  routes(require,
    route('articles', '/',
      route('article', '/article/:id', { addHandlerKey: true }),
      route('user', '/user/:id', { addHandlerKey: true })
    )
  );