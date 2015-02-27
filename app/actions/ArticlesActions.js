var Immutable = require('immutable');
var reducer = require('reapp-reducer');
var Actions = require('actions');
var Request = require('lib/request');
var parseUrl = require('parseurl');
var { Promise } = require('bluebird');
var Store = require('../store');

// todo: put this in reapp-ui: wait for animations
var AnimateStore = require('reapp-ui/stores/AnimateStore');
function waitForAnimations(res) {
  var animating = () => AnimateStore('viewList').step % 1 !== 0;

  var doneAnimating = (cb) => !animating() ? cb(null) :
      setTimeout(doneAnimating.bind(this, cb), 50);

  return Promise.promisify(doneAnimating)().then(() => res);
}

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
      .then(waitForAnimations)
      .then(insertNextArticles)
      .then(returnArticlesStore)
);

Actions.articleLoad.listen(
  id => {
    id = parseInt(id, 10);
    loadingStatus[id] = true;
    var article = Store().getIn(['articles', id]);

    if (article && article.get('status') === 'LOADED')
      return Promise.resolve(article);
    else
      return req.get(`item/${id}.json`)
        .then(res => {
          res.parentId = res.id;
          return res;
        })
        .then(waitForAnimations)
        .then(getAllKids)
        .then(loadedReducer)
        .then(waitForAnimations)
        .then(insertArticle);
  }
);

Actions.articleUnload.listen(
  id => {
    id = parseInt(id, 10);
    loadingStatus[id] = false;
    Store().setIn(['articles', id, 'data', 'kids'], null);
    Store().setIn(['articles', id, 'status'], 'OK');
  }
);

function loadHotArticles(opts) {
  return req.get('topstories.json', opts)
    .then(waitForAnimations)
    .then(res => {
      Store().set('hotArticles', res);
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
      Store().setIn(['articles', article.id], lastArticle);
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
  return Store().get('articles');
}

function exists(articleID) {
  return !!Store().getIn(['articles', articleID]);
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