import React from 'react';
import Component from 'component';
import ArticleItem from './ArticleItem';
import Comment from './Comment';
import TreeNode from 'reapp-ui/helpers/TreeNode';
import RotatingLoadingIcon from 'components/shared/RotatingLoadingIcon';

export default Component({
  getInitialState() {
    return {
      showLoader: false
    };
  },

  componentDidMount() {
    setTimeout(() => this.setState({ showLoader: true }), 800);
  },

  render() {
    const { article } = this.props;
    const commentsLoaded = article && article.get('status') === 'LOADED';
    const comments = article && article.get('kids');


    return (
      <div>
        {article &&
          <ArticleItem article={article} styles={styles.article} />
        }

        {!commentsLoaded && this.state.showLoader &&
          <div style={styles.fillWindow}>
            <div style={styles.verticalCenter}>
              <RotatingLoadingIcon blockOnAnimation="viewList" />
            </div>
          </div>
        }

        {commentsLoaded && comments &&
          <div style={styles.comments}>
            {comments && comments.map(comment =>
              <TreeNode
                idKey="id"
                childKey="kids"
                article={comment}
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

const styles = {
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
};