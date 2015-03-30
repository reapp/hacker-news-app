import { createAsyncActions } from 'fynx';

export default createAsyncActions([
  'articlesHotLoad',
  'articlesHotRefresh',
  'articlesHotLoadMore',
  'articleLoad',
  'articleUnload',
  'articleSave',
  'userLoad'
]);

// Required here so actions are bundled with the app
import './actions/ArticlesActions';
import './actions/UsersActions';