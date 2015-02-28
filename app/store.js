var { createCursorStore } = require('fynx');
var Immutable = require('immutable');

module.exports = createCursorStore(
  Immutable.fromJS({
    articles: {},
    hotArticles: [],
    users: [],
    savedArticles: []
  })
);