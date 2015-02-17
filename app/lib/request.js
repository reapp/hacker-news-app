var Parseurl = require('parseurl');
// var Superagent = require('superagent');
var { Promise } = require('bluebird');

// require('superagent-bluebird-promise');

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

    return new Promise((res, rej) => {
      var xhr = new XMLHttpRequest();
      console.log(this.getUrl(url))
      xhr.open('get', this.getUrl(url), true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if ((xhr.status >= 200 && xhr.status<=299) || xhr.status == 304)
            res(JSON.parse(xhr.responseText));
          else
            rej('Error in ajax communication: ' + xhr.statusText);
        }
      };
      xhr.send(null);
    });
  }
}

function error(err) {
  throw new Error(err);
}

module.exports = Request;