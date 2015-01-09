var Time = require('react-time');
var React = require('react');
var Component = require('component');
var Icon = require('reapp-ui/components/Icon');
var ListItem = require('reapp-ui/components/ListItem');
var { Link } = require('react-router');
var Badge = require('reapp-ui/components/Badge');

require('./ArticleItem.styl');

module.exports = Component({
  render() {
    var { key, cursor, index, noLink, styles, ...props } = this.props;

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
      <Link to="article" params={{id: article.get('id')}} activeClassName="">
        <Icon name="speech" color="#999999" />
      </Link>
    );

    return (
      <ListItem
        key={key || index}
        className="ArticleItem"
        styles={Object.assign({ after: { margin: 0 } }, styles)}
        wrapper={!noLink && <a className="article--link" href={article.get('url')} />}
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