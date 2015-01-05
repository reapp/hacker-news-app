var { route, routes } = require('reapp-routes/react-router/generator');

// this file uses the reapp-routes react-router generator
// which basically auto-maps routes to files

// so  /articles  to ./components/Articles.jsx
// and /article/1 to ./components/articles/Article.jsx

module.exports = routes(require,
  route('articles', '/',
    route('article', '/article/:id', { addHandlerKey: true }),
    route('user', '/user/:id', { addHandlerKey: true })
  )
);