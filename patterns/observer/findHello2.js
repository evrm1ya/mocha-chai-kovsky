const FindPattern = require('./FindPatternClass');

const findPatternObject = new FindPattern(/hello \w+/g);

findPatternObject
  .addFile('fileA.txt')
  .addFile('fileB.json')
  .find()
  .on('fileread', file => console.log('file read:', file))
  .on('found', (file, match) => {
    console.log(`Matched "${match}" in file ${file}`);
  })
  .on('error', err => {
    console.log(`Error emitted ${err.message}`)
  })
