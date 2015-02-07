var React = require('react');
var Component = require('component');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var View = require('reapp-ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');
var Actions = require('actions');
var { storeRefreshMixin } = require('reapp-platform');
var { RoutedViewListMixin } = require('reapp-routes/react-router');
var {
  ArticlesStore,
  HotArticlesStore,
  SavedArticlesStore,
  ViewListStateStore } = require('stores');

module.exports = Component({
  statics: {
    fetchData: Actions.articlesHotLoad
  },

  mixins: [
    RoutedViewListMixin,
    storeRefreshMixin(ArticlesStore, SavedArticlesStore)
  ],

  handleViewEntering(i) {
    ViewListStateStore().set('nested', i);
  },

  render() {
    return (
      <NestedViewList
        {...this.routedViewListProps()}
        onViewEntering={this.handleViewEntering}
        renderAfterAnimation
      >
        <View>
          <ArticlesHome
            savedArticlesStore={SavedArticlesStore()}
            hotArticlesStore={HotArticlesStore()}
            articlesStore={ArticlesStore()}
          />
        </View>

        {this.childRouteHandler()}
      </NestedViewList>
    );
  }
});

// titleBarProps={{height:48}}