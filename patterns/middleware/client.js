const zmq = require('zmq');
const ZmqMiddlewareManager = require('./ZmqMiddlewareManager');
const jsonMiddleware = require('./jsonMiddleware');

const request = zmq.socket('req');
request.connect('tcp://127.0.0.1:5000');

const zmqMiddlewareManager = new ZmqMiddlewareManager(request);
zmqMiddlewareManager.use(jsonMiddleware.json());

zmqMiddlewareManager.use({
  inbound: function(message, next) {
    console.log('Echoed back: ', message.data);
    next();
  }
});

setInterval(() => {
  zmqMiddlewareManager.send({ action: 'ping', echo: Date.now() });
}, 1000);

