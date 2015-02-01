var { createCursorStore } = require('fynx');
var { Map, List } = require('immutable');

function map() {
  return createCursorStore(Map());
}

function list() {
  return createCursorStore(List());
}

module.exports = {
  ArticlesStore:  map(),
  HotArticlesStore: list(),
  UsersStore: list(),
  SavedArticlesStore: list(),
  ViewListStateStore: map()
};