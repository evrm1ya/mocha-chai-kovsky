const EventEmitter = require('events');

class ReadOnlyEE extends EventEmitter {
  constructor(executor) {
    super();

    // Only use `emit` within the executor
    const emit = this.emit.bind(this);
    this.emit = undefined;
    executor(emit);
  }
}

module.exports = ReadOnlyEE;

