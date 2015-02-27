var React = require('react');
var Component = require('component');
var NestedViewList = require('reapp-ui/views/NestedViewList');
var Actions = require('actions');
var { storeRefreshMixin } = require('reapp-platform');
var { RoutedViewListMixin } = require('reapp-routes/react-router');
var Store = require('store');

var List = require('reapp-ui/components/List');
var ListItem = require('reapp-ui/components/ListItem');
var View = require('reapp-ui/views/View');
var ArticleItem = require('./articles/ArticleItem');
var RefreshButton = require('./articles/RefreshButton');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');

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

  listStyle: {
    self: {
      borderTop: 'none'
    }
  },

  render() {
    var articles;
    var hasArticles = Store().get('articles').size > 0;

    if (hasArticles)
      articles = Store().get('hotArticles')
        .map(id => Store().getIn(['articles', id]))
        .filter(x => typeof x !== 'undefined');

    var refreshButton =
      <RefreshButton
        onTap={this.handleRefresh}
        rotate={this.state.isRefreshing}
      />

    return (
      <NestedViewList {...this.routedViewListProps()} preload>
        <View title={[, 'Hot Articles', refreshButton]}>
          <List styles={this.listStyle}>
            {hasArticles && articles.map((article, i) =>
              <ArticleItem
                key={i}
                index={i}
                onClickComments={this.handleClickComments}
                cursor={article}
              />
            ).concat(
              <ListItem
                key={1000}
                styles={{
                  content: {
                    textAlign: 'center',
                    padding: 20
                  }
                }}
                onTap={this.handleLoadMore}>
                Load More
              </ListItem>
            )}

            {!hasArticles && !this.props.inactive &&
              <div style={{ padding: 20, marginLeft: -10 }}>
                <RotatingLoadingIcon />
              </div>
            }
          </List>
        </View>

        {this.childRouteHandler()}
      </NestedViewList>
    );
  }
});