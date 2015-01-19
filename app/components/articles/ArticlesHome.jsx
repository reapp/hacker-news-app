var React = require('react');
var Component = require('component');
var Tappable = require('react-tappable');
var Actions = require('actions');
var List = require('reapp-ui/components/List');
var Button = require('reapp-ui/components/Button');
var ListItem = require('reapp-ui/components/ListItem');
var View = require('reapp-ui/views/View');
var DottedViewList = require('reapp-ui/views/DottedViewList');
var AnimationLoop = require('reapp-ui/helpers/AnimationLoop');
var Icon = require('reapp-ui/components/Icon');
var ArticleItem = require('./ArticleItem');

module.exports = Component({
  getInitialState() {
    return {
      isRefreshing: false,
      shownArticle: null
    };
  },

  handleRefresh(e) {
    if (this.state.isRefreshing)
      return;

    this.setState({ isRefreshing: true });

    Actions.articlesHotLoad({ nocache: true }).then(() => {
      this.setState({ isRefreshing: false });
    });
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

  render() {
    var {
      savedArticlesStore,
      hotArticlesStore,
      articlesStore,
      ...props
    } = this.props;

    var articles = hotArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var savedArticles = savedArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var refreshButton = (
      <Button
        onClick={this.handleRefresh}
        chromeless
        icon={
          <AnimationLoop animation="rotate" active={this.state.isRefreshing}>
            <Icon
              name="arrow-refresh"
              size={24}
              stroke={1}
              isInTitleBar />
          </AnimationLoop>
        } />
    );

    var hasArticles = !!articles.count();
    var hasSavedArticles = !!savedArticles.count();

    var disabledProps;

    if (this.props.disableViewList)
      disabledProps = {
        disableScroll: true,
        touchStartBoundsX: { from: 20, to: window.innerWidth - 20 }
      };

    return (
      <div>
        {this.state.shownArticle && (
          <ArticleDrawer url={this.state.shownArticle.get('url')} />
        )}

        <DottedViewList {...props} {...disabledProps}>
          <View title={[, 'Hot Articles', refreshButton]}>
            <List styles={{ self: { borderTop: 'none' } }} nowrap>
              {hasArticles &&
                articles.map((article, i) =>
                  <Tappable key={i} onPress={this.handleArticlePress.bind(null, article.get('id'))}>
                    <ArticleItem
                      onClicked={this.handleArticleClick}
                      cursor={article} />
                  </Tappable>
                ).toArray().concat(
                  <ListItem
                    style={{textAlign:'center'}}
                    onClick={this.handleLoadMore}>
                    Load More
                  </ListItem>
                )
              }

              {!hasArticles &&
                <ListItem style={{textAlign: 'center'}}>Loading...</ListItem>
              }
              </List>
          </View>

          <View title="Saved Articles">
            {hasSavedArticles &&
              savedArticles.map((article, i) =>
                <ArticleItem
                  cursor={article}
                  key={i} />
              ).toArray()
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