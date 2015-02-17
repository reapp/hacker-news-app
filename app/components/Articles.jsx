var React = require('react');
var Component = require('component');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var View = require('reapp-ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');
var ActionsWorker = require('../actions.worker');
var { storeRefreshMixin } = require('reapp-platform');
var { RoutedViewListMixin } = require('reapp-routes/react-router');
var { Promise } = require('bluebird');
var {
  ArticlesStore,
  HotArticlesStore,
  SavedArticlesStore } = require('stores');

module.exports = Component({
  statics: {
    fetchData() {
      var Worker = ActionsWorker();
      console.log('worker', Worker);
      Worker.postMessage({ name: 'articlesHotLoad' });
      Worker.onmessage = function(event) {
        console.log('articles receive message', event);
      }

      return new Promise(function(res, rej) {
        console.log('articles post message');
      });
    }
  },

  mixins: [
    RoutedViewListMixin,
    storeRefreshMixin(ArticlesStore, SavedArticlesStore)
  ],

  render() {
    return (
      <NestedViewList {...this.routedViewListProps()}>
        <ArticlesHome
          savedArticlesStore={SavedArticlesStore()}
          hotArticlesStore={HotArticlesStore()}
          articlesStore={ArticlesStore()}
        />

        {this.childRouteHandler()}
      </NestedViewList>
    );
  }
});

// titleBarProps={{height:48}}