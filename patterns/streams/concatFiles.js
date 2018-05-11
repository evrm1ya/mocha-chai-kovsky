// Sequential execution
const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

function concatFiles(destination, files, callback) {
  const destStream = fs.createWriteStream(destination);

  // Create a readable stream from files array
  fromArray.obj(files)

    // Transform stream to handle each file in sequence
    .pipe(through.obj((file, enc, done) => {

      // Readable stream for each file
      const src = fs.createReadStream(file);

      // Pipe to Writable stream and don't close
      // destStream until source file finished reading
      src.pipe(destStream, { end: false });

      // trigger done to move on to next file
      src.on('end', done)
    }))
    .on('finish', () => {
      destStream.end();
      callback();
    });
}

module.exports = concatFiles;

