const fs = require('fs');
const combine = require('multipipe');
const { compressAndEncrypt } = require('./combinedStreams');

combine(
  fs.createReadStream(process.argv[3])
    .pipe(compressAndEncrypt(process.argv[2]))
    .pipe(fs.createWriteStream(process.argv[3] + '.gz.enc'))
).on('error', err => {
  console.log(err);
});

