var Immutable = require('immutable');
var reducer = require('reapp-reducer');
var Actions = require('actions');
var Client = require('lib/client');
var parseUrl = require('parseurl');

var {
    ArticlesStore,
    HotArticlesStore,
    SavedArticlesStore } = require('../stores');

var loadedReducer = reducer.bind(null, 'LOADED');
var page = 0;
var per = 10;

Actions.articlesHotLoad.listen(
  opts =>
    Client.get('topstories.json', opts)
      .then(res => {
        HotArticlesStore(res);
        insertArticles(res);
      })
      .then(returnArticlesStore)
);

Actions.articlesHotLoadMore.listen(
  () =>
    Client.get('topstories.json')
      .then(insertNextArticles)
      .then(returnArticlesStore)
);

Actions.articleLoad.listen(
  params => {
    var id = Number(params.id);
    var article = ArticlesStore().get(id);

    if (article && article.get('status') === 'LOADED')
      return new Promise(article);
    else
      return Client.get(`item/${id}.json`)
        .then(getAllKids)
        .then(loadedReducer)
        .then(insertArticle);
  }
);

Actions.articleSave.listen(
  id => {
    var savedArticles = SavedArticlesStore().deref();
    savedArticles = savedArticles.push(id);
    SavedArticlesStore(savedArticles);
  }
);

function insertArticle(res, rej) {
  if (rej) error(rej);
  if (res) {
    var lastArticle;

    res.map(article => {
      // set host
      article.data.host = parseUrl({ url: article.data.url }).hostname;

      // save ref to last article and store
      lastArticle = Immutable.fromJS(article);
      ArticlesStore().set(article.id, lastArticle);
    });

    return lastArticle;
  }
}

function insertNextArticles(articles) {
  page = page + 1;
  return insertArticles(articles);
}

function insertArticles(articles) {
  var start = page * per;

  return Promise.all(
    articles.slice(start, start + per).map(
      article => isObject(article) ? article :
        Client.get(`item/${article}.json`)
          .then(reducer)
          .then(insertArticle)
    )
  );
}

function getAllKids(item) {
  var kids = item.kids;
  item.closed = false;

  if (!kids)
    return new Promise(res => res(item));

  return Promise.all(
    kids.map(item => Client.get(`item/${item}.json`).then(getAllKids))
  )
  .then(res => {
    item.kids = res;
    item.kidsLoaded = true;
    return item;
  });
}

function returnArticlesStore() {
  return ArticlesStore();
}

function error(err) {
  throw err;
}

function isObject(x) {
  return typeof x === 'object';
}