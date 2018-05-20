// const fs = require('fs');
const levelup = require('level');
const fsAdapter = require('./fsAdapter');
const db = levelup('./fsDB', { valueEncoding: 'binary' });
const fs = fsAdapter(db);

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    console.log(res);
  });
});

fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.log(err);
});

// LevelUP itself has adapters to enable db to run in browser
// Can use adapter to share code between browser and node
