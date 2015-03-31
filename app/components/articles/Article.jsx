import { React, View, BackButton, TreeNode } from 'reapp-kit';
import ArticleItem from './ArticleItem';
import Comment from './Comment';
import RotatingLoadingIcon from 'components/shared/RotatingLoadingIcon';

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: false
    };
  }

  componentDidMount() {
    this._id = this.router.getCurrentParams().id;
    const self = this;

    setTimeout(() => {
      self.actions.articleLoad(self._id);
    }, 450);

    setTimeout(() => this.setState({ showLoader: true }), 800);
  }

  componentWillUnmount() {
    this.actions.articleUnload(this._id);
  }

  goBackView() {
    this.props.viewListScrollToStep(0);
  }

  render() {
    const { article, ...props } = this.props;

    if (!article)
      return null;

    const articleData = article.get('data');
    const commentsLoaded = article.get('status') === 'LOADED';
    const comments = articleData && articleData.get('kids');

    return (
      <View {...props}
        title={[
          <BackButton onTap={this.goBackView.bind(this)} />,
          'Comments'
        ]}
        styles={styles.view}>

        {articleData &&
          <ArticleItem article={articleData} styles={styles.article} />
        }

        {!commentsLoaded && this.state.showLoader &&
          <div style={styles.fillWindow}>
            <div style={styles.verticalCenter}>
              <RotatingLoadingIcon blockOnAnimation="viewList" />
            </div>
          </div>
        }

        {commentsLoaded && comments.size &&
          <div style={styles.comments}>
            {comments.map(comment =>
              <TreeNode
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

      </View>
    );
  }
}

const styles = {
  view: {
    static: {
      padding: 0
    }
  },

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