var Fynx = require('fynx');

module.exports = Fynx.createAsyncActions([
  'articlesHotLoad',
  'articlesHotRefresh',
  'articlesHotLoadMore',
  'articleLoad',
  'articleUnload',
  'articleSave',
  'userLoad'
]);

// Required here so actions are bundled with the app
require('./actions/ArticlesActions');
require('./actions/UsersActions');