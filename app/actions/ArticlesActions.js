var Immutable = require('immutable');
var reducer = require('reapp-reducer');
var Actions = require('actions');
var Request = require('lib/request');
var parseUrl = require('parseurl');
var { Promise } = require('bluebird');
var { ArticlesStore, HotArticlesStore } = require('../stores');

window.Stores = { ArticlesStore, HotArticlesStore }

var req = new Request({ base: 'https://hacker-news.firebaseio.com/v0/' });
var loadedReducer = reducer.bind(null, 'LOADED');
var loadingStatus = {};
var page = 0;
var per = 10;

Actions.articlesHotLoad.listen(
  opts => loadHotArticlesOnce(opts)
);

Actions.articlesHotRefresh.listen(
  opts => loadHotArticles(opts)
);

Actions.articlesHotLoadMore.listen(
  () =>
    req.get('topstories.json')
      .then(insertNextArticles)
      .then(returnArticlesStore)
);

Actions.articleLoad.listen(
  id => {
    id = parseInt(id, 10);
    loadingStatus[id] = true;
    var article = ArticlesStore().get(id);

    if (article && article.get('status') === 'LOADED')
      return Promise.resolve(article);
    else
      return req.get(`item/${id}.json`)
        .then(res => {
          res.parentId = res.id;
          return res;
        })
        .then(getAllKids)
        .then(loadedReducer)
        .then(insertArticle);
  }
);

Actions.articleUnload.listen(
  id => {
    id = parseInt(id, 10);
    loadingStatus[id] = false;
    ArticlesStore().setIn([id, 'data', 'kids'], null);
    ArticlesStore().setIn([id, 'status'], 'OK');
  }
);

function loadHotArticles(opts) {
  return req.get('topstories.json', opts)
    .then(res => {
      HotArticlesStore(res);
      insertArticles(res);
    })
    .then(returnArticlesStore);
}

var loadHotArticlesOnce = once(loadHotArticles);

function insertArticle(res, rej) {
  if (rej)
    return error(rej);

  var lastArticle;

  res.map(article => {
    // data transforms
    setHost(article);

    if (loadingStatus[article.id] !== false) {
      // save ref to last article and store
      lastArticle = Immutable.fromJS(article);
      ArticlesStore().set(article.id, lastArticle);
    }
  });

  return lastArticle;
}

function setHost(article) {
  article.data.host = parseUrl({ url: article.data.url }).hostname;
}

function insertNextArticles(articles) {
  page = page + 1;
  return insertArticles(articles);
}

function insertArticles(articles) {
  var start = page * per;

  return Promise.all(
    articles.slice(start, start + per).map(
      article => exists(article) ?
        article :
        req.get(`item/${article}.json`)
          .then(reducer)
          .then(insertArticle)
    )
  );
}

function getAllKids(item) {
  var parentId = item.parentId;

  if (!loadingStatus[parentId])
    return Promise.resolve(false);

  var kids = item.kids;
  item.closed = false;

  if (!kids)
    return Promise.resolve(item);

  return (
    Promise.all(
      kids.map(kid => {
        return loadingStatus[parentId] ?
          req.get(`item/${kid}.json`).then(res => {
            res.parentId = parentId;
            return getAllKids(res)
          }) :
          null
      })
    )
    .then(res => {
      item.kids = res;
      item.kidsLoaded = true;
      return item;
    })
  );
}

function returnArticlesStore() {
  return ArticlesStore();
}

function exists(articleID) {
  return !!ArticlesStore().get(articleID);
}

function error(err) {
  throw err;
}

function once(fn, context) {
  var result;

  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}