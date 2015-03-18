var React = require('react');
var Component = require('component');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var Actions = require('actions');
var { storeRefreshMixin } = require('reapp-platform');
var { RoutedViewListMixin } = require('reapp-routes/react-router');
var Store = require('store');
var View = require('reapp-ui/views/View');
var RefreshButton = require('./articles/RefreshButton');
var ArticlesContent = require('./ArticlesContent');
var Theme = require('reapp-ui/helpers/Theme');
var theme = require('theme/theme');

module.exports = Component({
  statics: {
    fetchData: Actions.articlesHotLoad
  },

  mixins: [
    RoutedViewListMixin,
    storeRefreshMixin(Store)
  ],

  getInitialState() {
    return {
      isRefreshing: false
    };
  },

  handleRefresh(e) {
    if (!this.state.isRefreshing) {
      this.setState({ isRefreshing: true });
      Actions.articlesHotRefresh().then(() => {
        this.setState({ isRefreshing: false });
      });
    }
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';

    this.setState({ isRefreshing: true });
    Actions.articlesHotLoadMore().then(() => {
      this.setState({ isRefreshing: false });
    });
  },

  render() {
    var store = Store();
    var refreshButton =
      <RefreshButton
        onTap={this.handleRefresh}
        rotate={this.state.isRefreshing}
      />

    return (
      <Theme {...theme}>
        <NestedViewList {...this.routedViewListProps()}>
          <View title={[, 'Hot Articles', refreshButton]}>
            <ArticlesContent
              store={store}
              onLoadMore={this.handleLoadMore}
            />
          </View>

          {this.childRouteHandler({
            articlesStore: store.get('articles')
          })}
        </NestedViewList>
      </Theme>
    );
  }
});