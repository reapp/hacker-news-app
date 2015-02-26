// var Time = require('react-time');
var React = require('react');
var Component = require('component');
var Icon = require('reapp-ui/components/Icon');
var ListItem = require('reapp-ui/components/ListItem');
var Badge = require('reapp-ui/components/Badge');
var Button = require('reapp-ui/components/Button');
var { Link } = require('react-router');
var Theme = require('theme/theme');

require('./ArticleItem.styl');

module.exports = Component({
  mixins: [
    'Navigation'
  ],

  handleTap() {
    var url = this.props.cursor.getIn(['data', 'url']);
    window.open(encodeURI(url), '_system');
  },

  openComments(e) {
    e.stopPropagation();
    this.transitionTo('article', { id: this.props.cursor.get('id') })
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
      margin: 0
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
      <ul>
        <li className="score">
          <Badge>{article.get('score')}</Badge>
        </li>
        <li className="author">
          <Link to="user" params={{id: article.get('by')}} activeClassName="">
            {article.get('by')}
          </Link>
        </li>
        <li className="time">
          {new Date(article.get('time') * 1000)}
        </li>
        <li className="url">
          {article.get('host')}
        </li>
      </ul>
    );

    var articleRight = (
      <Button
        onTap={this.openComments}
        tapActiveStyle={{opacity: 0.2}}
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
      <ListItem
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
      </ListItem>
    );
  }
});

// <Time value={new Date(article.get('time') * 1000)} relative />