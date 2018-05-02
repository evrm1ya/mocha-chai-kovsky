const fs = require('fs');
const cache = {};

function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    process.nextTick(() => callback(cache[filename]));
  } else {
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];

  consistentReadAsync(filename, value => {
    listeners.forEach(listener => listener(value));
  });

  return {
    onDataReady: listener => listeners.push(listener)
  };
}

const reader1 = createFileReader('data.txt');

reader1.onDataReady(data => {
  console.log('First call data: ' + data);

  //...sometime later we try to read again from
  //the same file
  const reader2 = createFileReader('data.txt');

  reader2.onDataReady( data => {
    console.log('Second call data: ' + data);
  });
});
