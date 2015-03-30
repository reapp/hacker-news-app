var Actions = require('actions');
var store = require('store');

Actions.userLoad.listen(id => {
  fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json`).then(res => {
    store().set('users', res);
  });
});