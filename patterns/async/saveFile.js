const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return callback(err);
    }

    fs.writeFile(filename, contents, callback);
  });
}

module.exports = saveFile;

