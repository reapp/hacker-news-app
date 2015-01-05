var Fynx = require('fynx');

var actions = Fynx.createAsyncActions([
  'articlesHotLoad',
  'articlesHotLoadMore',
  'articleLoad',
  'articleSave',
  'userLoad'
]);

module.exports = actions;

// Required here so actions are bundled with the app
require('./actions/ArticlesActions');
require('./actions/UsersActions');