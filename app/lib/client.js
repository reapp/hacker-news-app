var Parseurl = require('parseurl');
var Superagent = require('superagent');
var { Promise } = require('bluebird');

require('superagent-bluebird-promise');

// todo: localforage/storage support

class Client {
  constructor({ base }) {
    this.base = base || '';
    this.requests = {};
  }

  setBase(url) {
    this.base = url;
  }

  getUrl(url) {
    var host = new Parseurl(url).host;
    return host ? url : this.base + url;
  }

  get(url, opts) {
    opts = opts || {};

    if (!opts.nocache && this.requests[url])
      return Promise.resolve(this.requests[url]);
    else
      return Superagent.get(this.getUrl(url)).promise().then(
        res => {
          this.requests[url] = res.body;
          return res.body;
        },
        error
      );
  }
}

function error(err) {
  throw new Error(err);
}

var opts = {
  base: 'https://hacker-news.firebaseio.com/v0/'
};

module.exports = new Client(opts);