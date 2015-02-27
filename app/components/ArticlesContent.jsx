var React = require('react');
var Component = require('component');
var ArticleItem = require('./articles/ArticleItem');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');
var List = require('reapp-ui/components/List');
var ListItem = require('reapp-ui/components/ListItem');

module.exports = Component({
  listStyle: {
    self: {
      borderTop: 'none'
    }
  },

  render() {
    var { store } = this.props;
    var articles = store.get('articles');
    var hotArticles = store.get('hotArticles');

    var hasArticles = articles.size > 0;

    if (hasArticles)
      articles = hotArticles
        .map(id => articles.get(id))
        .filter(x => typeof x !== 'undefined');

    return (
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
            onTap={this.props.onLoadMore}>
            Load More
          </ListItem>
        )}

        {!hasArticles && !this.props.inactive &&
          <div style={{ padding: 20, marginLeft: -10 }}>
            <RotatingLoadingIcon />
          </div>
        }
      </List>
    )
  }
})