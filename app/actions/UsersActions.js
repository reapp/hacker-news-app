var Actions = require('../actions');
var Request = require('../lib/request');
var { UsersStore } = require('../stores');

var req = new Request({ base: 'https://hacker-news.firebaseio.com/v0/' });

Actions.userLoad.listen(id => {
  Client.get(`user/${id}.json`).then(UsersStore);
});