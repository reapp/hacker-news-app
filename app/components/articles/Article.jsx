import {
  React,
  Component,
  View,
  BackButton,
  TreeNode
  } from 'reapp-kit';
import ArticleItem from './ArticleItem';
import Comment from './Comment';
import RotatingLoadingIcon from 'components/shared/RotatingLoadingIcon';

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: false
    };
  }

  componentDidMount() {
    this._id = this.context.router.getCurrentParams().id;

    setTimeout(() => {
      this.context.actions.articleLoad(this._id);
    }, 450);

    setTimeout(() => this.setState({ showLoader: true }), 800);
  }

  componentWillUnmount() {
    this.context.actions.articleUnload(this._id);
  }

  goBackView() {
    this.props.viewListScrollToStep(0);
  }

  render() {
    const { articles, ...props } = this.props;
    const id = Number(this.context.router.getCurrentParams().id);
    const article = articles.getIn([id, 'data']);
    const commentsLoaded = article && article.get('status') === 'LOADED';
    const comments = article && article.get('kids');

    return (
      <View {...props}
        title={[<BackButton onTap={this.goBackView.bind(this)} />, 'Comments']}
        styles={styles.view}>

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

      </View>
    );
  }
}

const styles = {
  view: {
    inner: {
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