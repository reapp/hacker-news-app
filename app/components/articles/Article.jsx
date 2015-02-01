var React = require('react');
var Component = require('component');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TreeNode = require('reapp-ui/helpers/TreeNode');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var { ArticlesStore } = require('stores');
var Actions = require('actions');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');

require('./Article.styl');

module.exports = Component({
  mixins: [
    'RouteState',
    'Navigation'
  ],

  statics: {
    fetchData: Actions.articleLoad
  },

  getComments(comments) {
    return comments && comments.map(comment => (
      <TreeNode
        idKey="id"
        childKey="kids"
        cursor={comment}
        Component={Comment} />
    )).toArray();
  },

  goBackView() {
    this.props.viewListScrollToStep(0);
  },

  articleItemStyles: {
    self: { borderTop: 'none' },
    after: { display: 'none' }
  },

  // no padding on view, so list shows edge-to-edge
  viewStyles: {
    inner: { padding: 0 }
  },

  render() {
    var id = Number(this.getParams().id);
    var cursor = ArticlesStore().get(id);
    var article = cursor && cursor.get('data');
    var commentsLoaded = article && article.get('kidsLoaded');

    // todo: not get title from DOM but calc from article.get('kids')
    var title = `Comments (${document.getElementsByClassName('comment').length})`;

    return (
      <View {...this.props}
        id="Article"
        title={[<BackButton onClick={this.goBackView} />, title]}
        titleBarProps={{ height: 48 }}
        styles={this.viewStyles}>

        {article &&
          <ArticleItem cursor={cursor} styles={this.articleItemStyles} />
        }

        {!commentsLoaded &&
          <RotatingLoadingIcon />
        }

        {commentsLoaded &&
          <div id="comments">
            {this.getComments(article.get('kids'))}
          </div>
        }
      </View>
    );
  }
});