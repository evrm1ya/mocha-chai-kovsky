const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');
const LinkScraper = require('./LinkScraper');

const linkScraper = new LinkScraper();

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return callback(err);
    }

    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);

  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }

    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }

      console.log(`Downloaded and saved: ${url}`);

      callback(null, body);
    });
  });
}

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }


  let links = linkScraper.getPageLinks(currentUrl, body);
  //let links = utilities.getPageLinks(currentUrl, body);

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
  const filename = utilities.urlToFilename(url);
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

spider(process.argv[3], Number(process.argv[2]), err => {
  console.log(spiderCount);
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log('Download complete');
  }
});

