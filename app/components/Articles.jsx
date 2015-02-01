var React = require('react');
var Component = require('component');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var View = require('reapp-ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');
var Actions = require('actions');
var {
  storeRefreshMixin,
  RoutedViewListMixin } = require('reapp-platform');
var {
  ArticlesStore,
  HotArticlesStore,
  SavedArticlesStore } = require('stores');

module.exports = Component({
  statics: {
    fetchData: Actions.articlesHotLoad
  },

  mixins: [
    RoutedViewListMixin,
    storeRefreshMixin(ArticlesStore, SavedArticlesStore)
  ],

  render() {
    return (
      <NestedViewList
        {...this.routedViewListProps()}
        titleBarProps={{height:48}}>
        <View>
          <ArticlesHome
            savedArticlesStore={SavedArticlesStore()}
            hotArticlesStore={HotArticlesStore()}
            articlesStore={ArticlesStore()}
            freezeViewList={this.hasChildRoute()}
          />
        </View>

        {this.routedSubRoute()}
      </NestedViewList>
    );
  }
});