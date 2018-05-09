const fs = require('fs');
const download = require('./download');
const LinkScraper = require('./LinkScraper');
const linkScraper = new LinkScraper();

function spider(url, callback) {
  const filename = linkScraper.urlToFilename(url);
  console.log(filename)

  fs.exists(filename, exists => {
    if (exists) {
      return callback(null, filename, false);
    }

    download(url, filename, err => {
      if (err) {
        return callback(err);
      }

      callback(null, filename, true);
    });
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});

