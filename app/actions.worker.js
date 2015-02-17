onmessage = function(event) {
  console.log('onmessage', event);
  var Actions = require('./actions');
  console.log('required');
  Actions[event.data.name](event.data.opts).then(function(res) {
    console.log('actions response', res);
    postMessage(res);
  });
}