// var Time = require('react-time');
import React from 'react';
import Component from 'component';
import Icon from 'reapp-ui/components/Icon';
import List from 'reapp-ui/components/List';
import Badge from 'reapp-ui/components/Badge';
import Button from 'reapp-ui/components/Button';
import { Link } from 'react-router';
import Theme from 'theme/theme';

import './ArticleItem.styl';

export default Component({
  handleTap() {
    var url = this.props.article.getIn(['data', 'url']);
    window.open(url, window.cordova ? '_system' : '_blank');
  },

  openComments(e) {
    e.stopPropagation();
    this.context.router.transitionTo('article', { id: this.props.article.get('id') })
  },

  saveArticle() {
    if (this.props.onPress)
      this.props.onPress(this.props.article.get('id'));
  },

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
          <Link to="user" params={{id: article.get('by')}} activeClassName="">
            {article.get('by')}
          </Link>
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
        onTap={this.openComments}
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
        onTap={this.handleTap}
        title={article.get('title')}
        after={articleRight}
        index={index}
        noicon
        {...props}>
        {stats}
      </List.Item>
    );
  }
});

// <Time value={new Date(article.get('time') * 1000)} relative />

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