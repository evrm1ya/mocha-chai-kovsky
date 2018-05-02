const readJson = require('./readJson');
const readJsonThrows = require('./readJsonThrows');

/*
readJson('./good.json', (err, json) => {
  if (err) {
    throw err;
  }

  console.log(json);
});

readJson('./bad-json.txt', (err, json) => {
  if (err) {
    throw err;
  }

  console.log(json);
});

readJsonThrows('./good.json', (err, json) => {
  if (err) {
    throw err;
  }

  console.log('readJsonThrows: ' + json);
});

readJsonThrows('./bad-json.txt', err => console.log(err));
*/

process.on('uncaughtException', (err) => {
  console.error('Will catch JSON parsing exception\n' + err.message);
  process.exit(1);
});

// anti-pattern
try {
  readJsonThrows('./bad-json.txt', err => console.log(err));
} catch (err) {
  console.log('Not caught');
}


