const path = require('path');
const fs = require('fs');
const promisify = require('./promisify');
const request = promisify(require('request'));
const mkdirp = promisify(require('mkdirp'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const LinkScraper = require('../LinkScraper');

const linkScraper = new LinkScraper();

function spiderLinks(currentUrl, body, nesting) {
  let promise = Promise.resolve();

  if (nesting === 0) {
    return promise;
  }

  const links = linkScraper.getPageLinks(currentUrl, body);

  links.forEach(link => {
    promise = promise.then(() => spider(link, nesting - 1));
  });

  return promise;
}

function download(url, filename) {
  console.log(`Downloading ${url}`);

  let body;

  return request(url)
    .then(response => {
      body = response.body;
      return mkdirp(path.dirname(filename));
    })
    .then(() => writeFile(filename, body))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return body;
    });
}

function spider(url, nesting) {
  let filename = linkScraper.urlToFilename(url);

  return readFile(filename, 'utf8')
    .then(
      body => spiderLinks(url, body, nesting),
      err => {
        if (err.code !== 'ENOENT') {
          throw err;
        }

        return download(url, filename)
          .then(body => spiderLinks(url, body, nesting));
      });
}

spider(process.argv[2], 3)
  .then(() => console.log('Download complete'))
  .catch(err => console.log(err));
