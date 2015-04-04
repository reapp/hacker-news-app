import { actions, store } from 'reapp-kit';
import { fromJS } from 'immutable';
import reducer from 'reapp-reducer';
import parseUrl from 'parseurl';

// dont do stuff during view list animations
// const waitForAnimation = Promise.promisify(require('reapp-ui/lib/waitForAnimation'));
// const waitForViewList = res => waitForAnimation('viewList').then(() => res);

const url = path => `https://hacker-news.firebaseio.com/v0/${path}`;
const get = path => fetch(url(path)).then(validResponse);
const loadedReducer = reducer.bind(null, 'LOADED');
const loadingStatus = {};

let page = 0;
const per = 10;

actions('articlesHotLoad', opts => loadHotArticlesOnce(opts));
actions('articlesHotRefresh', opts => loadHotArticles(opts));

actions('articlesHotLoadMore', () =>
  get('topstories.json')
    // .then(waitForViewList)
    .then(insertNextArticles)
    .then(returnArticlesStore)
);

actions('articleLoad', id => {
  id = parseInt(id, 10);
  loadingStatus[id] = true;
  let article = store().getIn(['articles', id]);

  if (article && article.get('status') === 'LOADED')
    return Promise.resolve(article);
  else
    return get(`item/${id}.json`)
      .then(res => {
        res.parentId = res.id;
        return res;
      })
      // .then(waitForViewList)
      .then(getAllKids)
      .then(loadedReducer)
      // .then(waitForViewList)
      .then(insertArticle);
});

actions('articleUnload', id => {
  id = parseInt(id, 10);
  loadingStatus[id] = false;
  store().setIn(['articles', id, 'data', 'kids'], null);
  store().setIn(['articles', id, 'status'], 'OK');
});

function loadHotArticles() {
  return get('topstories.json')
    // .then(waitForViewList)
    .then(articles => {
      const start = page * per;
      const hotArticles = articles.slice(0, start + per);
      store().set('hotArticles', hotArticles);
      insertArticles(hotArticles);
    })
    .then(returnArticlesStore);
}

const loadHotArticlesOnce = once(loadHotArticles);

function validResponse(response) {
  return response.json();
}

function insertArticle(res, rej) {
  if (rej)
    return error(rej);

  let lastArticle;

  res.map(article => {
    if (loadingStatus[article.id] !== false)
      store().updateIn(['articles', article.id], () =>
        fromJS(setHost(article)));
  });

  return lastArticle;
}

function setHost(article) {
  article.data.host = parseUrl({ url: article.data.url }).hostname;
  return article;
}

function insertArticles(articles) {
  return Promise.all(
    articles.map(
      article => exists(article) ?
        article :
        get(`item/${article}.json`)
          .then(reducer)
          .then(insertArticle)
    )
  );
}

function insertNextArticles(articles) {
  page = page + 1;
  return insertArticles(articles);
}

function getAllKids(item) {
  let parentId = item.parentId;

  if (!loadingStatus[parentId])
    return Promise.resolve(false);

  let kids = item.kids;
  item.closed = false;

  if (!kids)
    return Promise.resolve(item);

  return (
    Promise.all(
      kids.map(kid => {
        return loadingStatus[parentId] ?
          get(`item/${kid}.json`).then(res => {
            res.parentId = parentId;
            return getAllKids(res);
          }) :
          null;
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
  return store().get('articles');
}

function exists(articleID) {
  return !!store().getIn(['articles', articleID]);
}

function error(err) {
  throw err;
}

function once(fn, context) {
  let result;

  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}