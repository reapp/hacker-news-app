// var Time = require('react-time');
var React = require('react');
var Component = require('component');
var Icon = require('reapp-ui/components/Icon');
var List = require('reapp-ui/components/List');
var Badge = require('reapp-ui/components/Badge');
var Button = require('reapp-ui/components/Button');
var { Link } = require('react-router');
var Theme = require('theme/theme');

require('./ArticleItem.styl');

module.exports = Component({
  handleTap() {
    var url = this.props.cursor.getIn(['data', 'url']);
    window.open(url, window.cordova ? '_system' : '_blank');
  },

  openComments(e) {
    e.stopPropagation();
    this.context.router.transitionTo('article', { id: this.props.cursor.get('id') })
  },

  saveArticle() {
    if (this.props.onPress)
      this.props.onPress(this.props.cursor.get('id'));
  },

  styles: {
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
  },

  render() {
    var {
      key,
      cursor,
      index,
      noLink,
      styles,
      ...props } = this.props;

    if (!cursor)
      return null;

    var article = cursor.get('data');

    var stats = (
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

    var articleRight = (
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

    var mergedStyles = Object.assign({}, this.styles, styles);

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