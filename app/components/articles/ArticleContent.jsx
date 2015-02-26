var React = require('react');
var Component = require('component');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TreeNode = require('reapp-ui/helpers/TreeNode');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');

module.exports = Component({
  getInitialState() {
    return {
      showLoader: false
    };
  },

  componentDidMount() {
    setTimeout(() => this.setState({ showLoader: true }), 800);
  },

  styles: {
    article: {
      self: {
        padding: '0 10px'
      },

      title: {
        fontSize: '16px',
        marginBottom: '6px'
      },

      content: {
        borderTop: 'none'
      },

      after: {
        display: 'none'
      }
    },

    comments: {
      display: 'block',
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

        {!commentsLoaded && this.state.showLoader &&
          <div style={this.styles.fillWindow}>
            <div style={this.styles.verticalCenter}>
              <RotatingLoadingIcon blockOnAnimation="viewList" />
            </div>
          </div>
        }

        {commentsLoaded && comments &&
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

        {commentsLoaded && !comments &&
          <div className="verticalCenter">
            <h3>No comments</h3>
          </div>
        }
      </div>
    );
  }
});