var React = require('react');
var Component = require('component');
var Actions = require('actions');
var List = require('reapp-ui/components/List');
var ListItem = require('reapp-ui/components/ListItem');
var View = require('reapp-ui/views/View');
var DottedViewList = require('reapp-ui/views/DottedViewList');
var Modal = require('reapp-ui/components/Modal');
var ArticleItem = require('./ArticleItem');
var ArticleDrawer = require('./ArticleDrawer');
var RefreshButton = require('./RefreshButton');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');
var { ViewListStateStore } = require('stores');

module.exports = Component({
  getInitialState() {
    return {
      isRefreshing: false,
      shownArticle: null,
      showSavedModal: false
    };
  },

  handleRefresh(e) {
    if (!this.state.isRefreshing) {
      this.setState({ isRefreshing: true });
      Actions.articlesHotLoad({ nocache: true }).then(() => {
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

  handleArticlePress(id) {
    // todo: make ui alerts and integrate
    Actions.articleSave(id);
    this.setState({ showSavedModal: true });
  },

  closeModal() {
    this.setState({ showSavedModal: false });
  },

  handleArticleClick(article) {
    this.setState({
      shownArticle: article
    });
  },

  closeArticleDrawer() {
    this.setState({
      shownArticle: false
    });
  },

  listStyle: {
    self: {
      borderTop: 'none'
    }
  },

  parentViewListIsNested() {
    return ViewListStateStore().get('nested') === 1;
  },

  render() {
    var {
      savedArticlesStore,
      hotArticlesStore,
      articlesStore,
      ...props } = this.props;

    var articles = hotArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var savedArticles = savedArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var hasArticles = !!articles.count();
    var hasSavedArticles = !!savedArticles.count();

    var refreshButton =
      <RefreshButton
        onClick={this.handleRefresh}
        rotate={this.state.isRefreshing}
      />

    return (
      <div>
        {this.state.showSavedModal &&
          <Modal title="Saved Article" onClose={this.closeModal} />
        }

        {this.state.shownArticle &&
          <ArticleDrawer
            url={this.state.shownArticle.get('url')}
            onClose={this.closeArticleDrawer}
          />
        }

        <DottedViewList {...props} {...(this.parentViewListIsNested() && {
          disableScroll: true,
          touchStartBoundsX: { from: 20, to: window.innerWidth - 20 }
        })}>
          <View title={[, 'Hot Articles', refreshButton]}>
            <List styles={this.listStyle}>
              {hasArticles && articles.map((article, i) =>
                <ArticleItem
                  key={i}
                  index={i}
                  onPress={this.handleArticlePress}
                  onClicked={this.handleArticleClick}
                  onClickComments={this.handleClickComments}
                  cursor={article}
                />
              ).toArray().concat(
                <ListItem
                  key={1000}
                  style={{textAlign:'center'}}
                  onClick={this.handleLoadMore}>
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

          <View title="Saved Articles">
            {hasSavedArticles &&
              <List styles={this.listStyle}>
                {savedArticles.map((article, i) =>
                  <ArticleItem
                    key={i}
                    index={i}
                    cursor={article}
                    onClicked={this.handleArticleClick}
                  />
                ).toArray()}
              </List>
            }

            {!hasSavedArticles &&
              <p>My saved articles. Try swiping an articles to the right to add it here.</p>
            }
          </View>
        </DottedViewList>
      </div>
    );
  }
});