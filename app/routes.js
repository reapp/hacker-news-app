module.exports = ({ routes, route }) =>
  routes(require,
    route('articles', '/',
      route('article', '/article/:id'),
      route('user', '/user/:id')
    )
  );