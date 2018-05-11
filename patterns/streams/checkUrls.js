const fs = require('fs');
const path = require('path');
const split = require('split');
const request = require('request');
const LimitedParallelStream = require('./LimitedParallelStream');
//const ParallelStream = require('./ParallelStream');

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(new LimitedParallelStream(2, (url, enc, push, done) => {
    if (!url) {
      return done();
    }

    request.head(url, (err, response) => {
      push(`${url} is ${err ? 'down' : 'up'}\n`);
      done();
    });
  }))
  .pipe(fs.createWriteStream(path.join(__dirname, '/datasets/url-results.txt')))
  .on('finish', () => {
    console.log('All urls were checked');
  });

// node checkUrls ./datasets/urlList.txt
