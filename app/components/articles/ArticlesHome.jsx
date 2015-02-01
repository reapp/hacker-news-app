var React = require('react');
var Component = require('component');
var Tappable = require('react-tappable');
var Actions = require('actions');
var List = require('reapp-ui/components/List');
var ListItem = require('reapp-ui/components/ListItem');
var View = require('reapp-ui/views/View');
var DottedViewList = require('reapp-ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ArticleDrawer = require('./ArticleDrawer');
var RefreshButton = require('./RefreshButton');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');

module.exports = Component({
  getInitialState() {
    return {
      isRefreshing: false,
      shownArticle: null,
      viewListStep: 0
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.freezeViewList) {
      console.log('freeze');
    }
  },

  viewEntered(i) {
    console.log(i);
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
    self: { borderTop: 'none' }
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

    var disabledProps = this.props.freezeViewList && {
      disableScroll: true,
      touchStartBoundsX: { from: 20, to: window.innerWidth - 20 }
    };

    var refreshButton = (
      <RefreshButton
        onClick={this.handleRefresh}
        active={this.state.isRefreshing}
      />
    );

    return (
      <div>
        {this.state.shownArticle && (
          <ArticleDrawer
            url={this.state.shownArticle.get('url')}
            onClose={this.closeArticleDrawer}
          />
        )}

        <DottedViewList
          {...props}
          {...disabledProps}
          onViewEntered={this.viewEntered}
          scrollToStep={this.state.viewListStep}
          >
          <View title={[, 'Hot Articles', refreshButton]}>
            <List styles={this.listStyle}>
              {hasArticles && articles.map((article, i) =>
                <Tappable key={i} onPress={this.handleArticlePress.bind(null, article.get('id'))}>
                  <ArticleItem
                    index={i}
                    onClicked={this.handleArticleClick}
                    cursor={article}
                  />
                </Tappable>
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