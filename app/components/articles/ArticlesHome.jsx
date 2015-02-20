var React = require('react');
var Component = require('component');
var Actions = require('actions');
var List = require('reapp-ui/components/List');
var ListItem = require('reapp-ui/components/ListItem');
var View = require('reapp-ui/views/View');
var ArticleItem = require('./ArticleItem');
var RefreshButton = require('./RefreshButton');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');
var { ViewListStateStore } = require('stores');

module.exports = Component({
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
    var {
      hotArticlesStore,
      articlesStore,
      ...props } = this.props;

    var articles = hotArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var hasArticles = !!articles.count();

    var refreshButton =
      <RefreshButton
        onTap={this.handleRefresh}
        rotate={this.state.isRefreshing}
      />

    return (
      <View title={[, 'Hot Articles', refreshButton]} {...props}>
        <List styles={this.listStyle}>
          {hasArticles && articles.map((article, i) =>
            <ArticleItem
              key={i}
              index={i}
              onClickComments={this.handleClickComments}
              cursor={article}
            />
          ).toArray().concat(
            <ListItem
              key={1000}
              style={{textAlign: 'center'}}
              onTap={this.handleLoadMore}>
              Load More
            </ListItem>
          )}

          {!hasArticles &&
            <div style={{ padding: 20, marginLeft: -10 }}>
              <RotatingLoadingIcon />
            </div>
          }
        </List>
      </View>
    );
  }
});