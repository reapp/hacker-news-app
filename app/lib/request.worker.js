onmessage = function(event) {
  var Request = require('./request');
  console.log('start', event)
  var Req = new Request({ base: event.data.base });

  Req[event.data.type](event.data.url, event.data.opts).then(res => {
    postMessage(res);
  })
}