// Note: parallel streams can't be used when the order in which
// the data is processed is important
const stream = require('stream');

class ParallelStream extends stream.Transform {
  constructor(userTransform) {
    super({ objectMode: true });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
  }

  // Execute userTransform then increment count of running tasks
  // this._onComplete notifies when userTransform completes
  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this.push.bind(this),
      this._onComplete.bind(this));

    done();
  }

  // Tasks still running?
  // put finish event on hold by putting done on terminateCallback
  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  // invoked every time an async task completes
  // no tasks left to run?
  // invoke terminateCallback to cause stream to end and
  // release finish event
  _onComplete(err) {
    this.running--;

    if (err) {
      return this.emit('error', err);
    }

    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}

module.exports = ParallelStream;

