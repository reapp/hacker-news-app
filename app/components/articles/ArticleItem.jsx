import {
  React,
  Component,
  Icon,
  List,
  Badge,
  Button,
  Tappable
  } from 'reapp-kit';

import './ArticleItem.styl';

export default class ArticleItem extends Component {
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
      styles,
      ...props } = this.props;

    if (!article)
      return null;

    const stats = (
      <div className="meta">
        <div className="score">
          <Badge>{article.get('score')}</Badge>
        </div>
        <div className="author">
          <Tappable onTap={() => this.context.router.transitionTo('user', {
            id: article.get('by')
          })}>
            {article.get('by')}
          </Tappable>
        </div>
        <div className="time">
          {new Date(article.get('time') * 1000)}
        </div>
        <div className="url">
          {article.get('host')}
        </div>
      </div>
    );

    const articleRight = (
      <Button
        onTap={this.openComments.bind(this)}
        tapFocusStyle={{opacity: 0.2}}
        style={{width:'100%', flexGrow:1, WebkitFlexGrow:1}}
        stopPropagation
        chromeless>
        <Icon
          file={require('reapp-ui/assets/icons/speech.svg')}
          color={'#ab511f'}
          stroke={0}
          styles={{self: { margin: 'auto' }}}
        />
      </Button>
    );

    const mergedStyles = Object.assign({}, this.styles, styles);

    return (
      <List.Item
        key={key || index}
        className="ArticleItem"
        styles={mergedStyles}
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
  content: {
    paddingTop: 12,
    paddingBottom: 12
  },

  after: {
    margin: 0,
    padding: 0
  },

  children: {
    WebkitLineClamp: 'none'
  }
};