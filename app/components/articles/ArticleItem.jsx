import { React, Icon, List, Badge, Button, Tappable } from 'reapp-kit';

export default class ArticleItem extends React.Component {
  handleTap() {
    var url = this.props.article.getIn(['data', 'url']);
    window.open(url, window.cordova ? '_system' : '_blank');
  }

  openComments(e) {
    e.stopPropagation();
    this.context.router.transitionTo('article', { id: this.props.article.get('id') })
  }

  saveArticle() {
    if (this.props.onPress)
      this.props.onPress(this.props.article.get('id'));
  }

  render() {
    const {
      key,
      article,
      index,
      noLink,
      ...props } = this.props;

    if (!article)
      return null;

    const stats = (
      <div styles={styles.meta}>
        <div styles={styles.score}>
          <Badge>{article.get('score')}</Badge>
        </div>
        <div styles={styles.author}>
          <Tappable onTap={() => this.context.router.transitionTo('user', {
            id: article.get('by')
          })}>
            {article.get('by')}
          </Tappable>
        </div>
        <div styles={styles.time}>
          {new Date(article.get('time') * 1000)}
        </div>
        <div styles={styles.url}>
          {article.get('host')}
        </div>
      </div>
    );

    const articleRight = (
      <Button
        onTap={this.openComments.bind(this)}
        tapFocusStyle={{opacity: 0.2}}
        styles={styles.commentsButton}
        stopPropagation
        chromeless>
        <Icon
          file={require('reapp-kit/icons/speech.svg')}
          color={'#ab511f'}
          stroke={0}
          styles={styles.commentsIcon}
        />
      </Button>
    );

    return (
      <List.Item
        key={key || index}
        styles={styles.item}
        onTap={this.handleTap.bind(this)}
        title={article.get('title')}
        after={articleRight}
        index={index}
        noicon
        {...props}>
        {stats}
      </List.Item>
    );
  }
}

const styles = {
  item: {
    self: {
      flexFlow: 'row',
      flexWrap: 'nowrap',
      width: '100%'
    },

    content: {
      paddingTop: 12,
      paddingBottom: 12
    },

    after: {
      margin: 0,
      padding: 0,
      flexGrow: 1,
      WebkitFlexGrow: 1,
      width: '66px',
      zIndex: 3,
      position: 'relative'
    },

    children: {
      WebkitLineClamp: 'none'
    }
  },

  commentsButton: {
    self: {
      width: '100%',
      flexGrow: 1,
      WebkitFlexGrow: 1
    }
  },

  commmentsIcon: {
    self: {
      margin: 'auto'
    }
  },

  meta: {
    color: '#999',
    listStyle: 'none',
    padding: 0,
    margin: '3px 0 0',
    flexFlow: 'row',
    WebkitFlexFlow: 'row',
    width: '100%'
  },

  score: {
    flexGrow: 0,
    WebkitFlexGrow: 0,
    padding: 0
  },

  url: {
    flexGrow: 2,
    WebkitFlexGrow: 2,
    textAlign: 'right'
  },

  author: {
    marginLeft: '10px'
  },

  a: {
    color: '#999 !important'
  }
};