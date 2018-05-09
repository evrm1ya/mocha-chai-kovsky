const fs = require('fs');
const download = require('./download');
const LinkScraper = require('./LinkScraper');

const linkScraper = new LinkScraper();

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  const links = linkScraper.getPageLinks(currentUrl, body);

  if (links.length === 0) {
    return process.nextTick(callback);
  }

  let completed = 0;
  let hasErrors = false;

  function done(err) {
    if (err) {
      hasErrors = true;
      return callback(err);
    }

    if (++completed === links.length && !hasErrors) {
      return callback();
    }
  }

  links.forEach(function(link) {
    spider(link, nesting - 1, done);
  });
}

function spider(url, nesting, callback) {
  const filename = linkScraper.urlToFilename(url);

  fs.readFile(filename, 'utf8', (err, body) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }

      return download(url, filename, (err, body) => {
        if (err) {
          return callback(err);
        }

        spiderLinks(url, body, nesting, callback);
      });
    }

    spiderLinks(url, body, nesting, callback);
  });
}

spider(process.argv[2], process.argv[3], (err) => {
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log('Download complete');
  }
});

