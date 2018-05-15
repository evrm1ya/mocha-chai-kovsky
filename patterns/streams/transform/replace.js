const ReplaceStream = require('./ReplaceStream');

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout);

// echo Hello World! | node replace World Node.js
