const fs = require('fs');
const cache = {};

function consistentReadSync(filename) {
  if (cache[filename]) {
    // invoked synchronously
    console.log('data from cache');
    return cache[filename];
  } else {
    // asynchronous function
    console.log('caching file');
    cache[filename] = fs.readFileSync(filename, 'utf8');
    return cache[filename];
  }
}

class FileReader {
  constructor(filename) {
    this.filename = filename;
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);

    return this;
  }

  read() {
    let value = consistentReadSync(this.filename);
    this.listeners.forEach(listener => listener(value));
  }
}

const reader1 = new FileReader('data.txt')
  .addListener(value => {
    console.log('First call data: ' + value);

    const reader2 = new FileReader('data.txt')
      .addListener(value => { console.log('Second call data: ' + value); })
      .read();
  })
  .read();

