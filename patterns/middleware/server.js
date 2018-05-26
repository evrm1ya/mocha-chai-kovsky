const zmq = require('zmq');
const ZmqMiddlewareManager = require('./ZmqMiddlewareManager');
const jsonMiddleware = require('./jsonMiddleware');

const reply = zmq.socket('rep');
reply.bind('tcp://127.0.0.1:5000');

const zmqMiddlewareManager = new ZmqMiddlewareManager(reply);
zmqMiddlewareManager.use(jsonMiddleware.json());

zmqMiddlewareManager.use({
  inbound: function(message, next) {
    console.log('Received: ', message.data);

    if (message.data.action === 'ping') {
      this.send({ action: 'pong', echo: message.data.echo });
    }

    next();
  }
});

