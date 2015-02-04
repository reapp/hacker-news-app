var Time = require('react-time');
var React = require('react');
var Component = require('component');
var Icon = require('reapp-ui/components/Icon');
var ListItem = require('reapp-ui/components/ListItem');
var Badge = require('reapp-ui/components/Badge');
var Tappable = require('react-tappable');
var { Link } = require('react-router');

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
          <Time value={new Date(article.get('time') * 1000)} relative />
        </li>
        <li className="url">
          {article.get('host')}
        </li>
      </ul>
    );

    var articleRight = (
      <Tappable onTap={this.openComments} style={{width:'100%'}}>
        <Icon name="speech" color="rgba(0,0,0,0.8)" stroke={0} crisp />
      </Tappable>
    );

    return (
      <ListItem
        key={key || index}
        className="ArticleItem"
        styles={Object.assign({ after: { margin: 0, background: 'rgba(0,0,0,0.03)' } }, styles)}
        onTap={this.openArticle}
        title={article.get('title')}
        after={articleRight}
        index={index}
        noicon>
        {stats}
      </ListItem>
    );
  }
});

// <Time value={new Date(article.get('time') * 1000)} relative />