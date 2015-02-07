var Parseurl = require('parseurl');
var Superagent = require('superagent');
var { Promise } = require('bluebird');

require('superagent-bluebird-promise');

class Request {
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

module.exports = Request;