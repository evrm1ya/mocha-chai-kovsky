const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    const chunk = chance.string();
    console.log(`Pushing chunk of size: ${chunk.length}`);

    // push string to internal reading buffer
    this.push(chunk, 'utf8');

    // EOF or end of stream
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

module.exports = RandomStream;

