// var Time = require('react-time');
var React = require('react');
var Component = require('component');
var Icon = require('reapp-ui/components/Icon');
var ListItem = require('reapp-ui/components/ListItem');
var Badge = require('reapp-ui/components/Badge');
var Tappable = require('reapp-ui/helpers/Tappable');
var { Link } = require('react-router');
var Theme = require('theme/theme');

require('./ArticleItem.styl');

module.exports = Component({
  mixins: [
    'Navigation'
  ],

  openArticle() {
    if (this.props.onClicked)
      this.props.onClicked(this.props.cursor.get('data'));
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
    after: {
      margin: 0
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
      <Tappable onTap={this.openComments} style={{width:'100%', flexGrow:1, WebkitFlexGrow:1}}>
        <Icon
          name="speech"
          color={Theme.getConstants('darkGray')}
          stroke={0}
          crisp
        />
      </Tappable>
    );

    var mergedStyles = Object.assign({}, this.styles, styles);

    return (
      <ListItem
        key={key || index}
        className="ArticleItem"
        styles={mergedStyles}
        onTap={this.openArticle}
        onPress={this.saveArticle}
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