const fs = require('fs');
const download = require('./download');
const LinkScraper = require('./LinkScraper');
const linkScraper = new LinkScraper();

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  let links = linkScraper.getPageLinks(currentUrl, body);

  function iterate(index) {
    if (index === links.length) {
      return callback();
    }

    spider(links[index], nesting - 1, err => {
      if (err) {
        return callback(err);
      }

      iterate(index + 1);
    });

  }

  iterate(0);
}

let spiderCount = 0;

function spider(url, nesting, callback) {
  const filename = linkScraper.urlToFilename(url);
  spiderCount++;

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

spider(process.argv[2], Number(process.argv[3]), err => {
  console.log(spiderCount);
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log('Download complete');
  }
});

