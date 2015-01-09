var React = require('react');
var Component = require('component');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var ImmutableTreeNode = require('reapp-ui/helpers/ImmutableTreeNode');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var { ArticlesStore } = require('stores');
var Actions = require('actions');

require('./Article.styl');

module.exports = Component({
  mixins: [
    'RouteState'
  ],

  statics: {
    fetchData: params => Actions.articleLoad(params)
  },

  getComments(comments) {
    return comments && comments.map(comment => (
      <ImmutableTreeNode
        idKey="id"
        cursor={comment}
        childKey="kids"
        renderComponent={Comment} />
    )).toArray();
  },

  render() {
    var cursor = ArticlesStore().get(Number(this.getParams().id));
    var article = cursor && cursor.get('data');
    var commentsLoaded = article && article.get('kidsLoaded');
    var articleItemStyles = {
      self: { borderTop: 'none' },
      after: { display: 'none' }
    };

    // todo: not get title from DOM but calc from state
    var title = `Comments (${document.getElementsByClassName('comment').length})`;
    var backButton = (
      <BackButton onClick={this.props.viewListScrollToStep.bind(null, 0)} />
    );

    return (
      <View {...this.props}
        id="Article"
        title={[backButton, title]}
        titleBarProps={{ height: 48 }}
        styles={{ inner: { padding: 0 } }}>
        {article && (
          <ArticleItem cursor={cursor} styles={articleItemStyles} />
        )}
        {commentsLoaded && (
          <div id="comments">
            {this.getComments(article.get('kids'))}
          </div>
        )}
      </View>
    );
  }
});