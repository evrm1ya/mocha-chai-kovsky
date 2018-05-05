const EventEmitter = require('events').EventEmitter;

class SyncEmit extends EventEmitter {
  constructor() {
    super();
    this.emit('ready');
  }
}

const syncEmit = new SyncEmit();
// listener not called
syncEmit.on('ready', () => console.log('object ready to be used'));
