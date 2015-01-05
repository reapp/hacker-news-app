var { createCursorStore } = require('fynx');
var { List } = require('immutable');

module.exports = {
  ArticlesStore: createCursorStore(),
  HotArticlesStore: createCursorStore(List()),
  UsersStore: createCursorStore(List()),
  SavedArticlesStore: createCursorStore(List())
};