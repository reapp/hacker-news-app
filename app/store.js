var { createCursorStore } = require('fynx');
var Immutable = require('immutable');

function map() {
  return createCursorStore(Map());
}

function list() {
  return createCursorStore(List());
}

module.exports = createCursorStore(Immutable.fromJS({
  articles: {},
  hotArticles: [],
  users: [],
  savedArticles: []
}));