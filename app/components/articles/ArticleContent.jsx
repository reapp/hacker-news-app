var React = require('react');
var Component = require('component');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TreeNode = require('reapp-ui/helpers/TreeNode');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');

module.exports = Component({
  styles: {
    article: {
      self: {
        borderTop: 'none',
        padding: '10px'
      },
      after: {
        display: 'none'
      }
    },

    comments: {
      textWrap: 'nowrap',
      overflow: 'hidden'
    },

    fillWindow: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },

    verticalCenter: {
      margin: 'auto'
    }
  },

  render() {
    var { cursor } = this.props;

    if (!cursor)
      return null;

    var article = cursor.get('data');
    var commentsLoaded = cursor.get('status') === 'LOADED';
    var comments = article.get('kids');

    return (
      <div>
        {article &&
          <ArticleItem cursor={cursor} styles={this.styles.article} />
        }

        {!commentsLoaded &&
          <div style={this.styles.fillWindow}>
            <div style={this.styles.verticalCenter}>
              <RotatingLoadingIcon active={!this.isAnimating('viewList')} />
            </div>
          </div>
        }

        {commentsLoaded &&
          <div style={this.styles.comments}>
            {comments && comments.map(comment =>
              <TreeNode
                idKey="id"
                childKey="kids"
                cursor={comment}
                Component={Comment}
              />
            )}
          </div>
        }
      </div>
    );
  }
});