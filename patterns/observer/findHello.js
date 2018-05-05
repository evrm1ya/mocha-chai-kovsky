const findPattern = require('./findPattern');

findPattern(['fileA.txt', 'fileB.json'], /hello \w+/g)
  .on('fileread', file => console.log(file + ' was read'))
  .on('found', (file, match) => {
    console.log('Matched "' + match + '" in file ' + file);
  })
  .on('error', err => {
    console.log('Error emitted: ' + err.message);
  })
