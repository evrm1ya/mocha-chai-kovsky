const fs = require('fs');

module.exports = function readJsonThrows(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    callback(null, JSON.parse(data));
  });
}

