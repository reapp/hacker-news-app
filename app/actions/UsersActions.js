var Actions = require('actions');
var Client = require('lib/client');
var { UsersStore } = require('stores');

Actions.userLoad.listen(id => {
  Client.get(`user/${id}.json`).then(UsersStore);
});