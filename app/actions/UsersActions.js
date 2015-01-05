var Component = require('component');
var Client = require('lib/client');
var { UsersStore } = require('stores');
var Actions = require('actions');

Actions.userLoad.listen(id => {
  Client.get(`user/${id}.json`).then(UsersStore);
});