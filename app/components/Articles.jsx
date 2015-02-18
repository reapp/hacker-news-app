var React = require('react');
var Component = require('component');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var View = require('reapp-ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');
var Actions = require('actions');
var { storeRefreshMixin } = require('reapp-platform');
var { RoutedViewListMixin } = require('reapp-routes/react-router');
var { ArticlesStore, HotArticlesStore } = require('stores');

module.exports = Component({
  statics: {
    fetchData: Actions.articlesHotLoad
  },

  mixins: [
    RoutedViewListMixin,
    storeRefreshMixin(ArticlesStore)
  ],

  render() {
    return (
      <NestedViewList {...this.routedViewListProps()}>
        <ArticlesHome
          hotArticlesStore={HotArticlesStore()}
          articlesStore={ArticlesStore()}
        />

        {this.childRouteHandler()}
      </NestedViewList>
    );
  }
});