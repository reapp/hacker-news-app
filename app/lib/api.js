var Client = require('reapp-request');

var opts = {
  base: 'https://hacker-news.firebaseio.com/v0/'
};

module.exports = new Client(opts);