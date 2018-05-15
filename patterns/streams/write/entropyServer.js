const Chance = require('chance');
const chance = new Chance();

require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  /*
  while (chance.bool({ likelihood: 95 })) {
    res.write(chance.string() + '\n');
  }

  res.end('\nThe end...\n');

  res.on('finish', () => {
    console.log('All data was sent');
  });

  */

  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      // Size of data chunk increased to 16KB - 1
      // Close to default highWaterMark
      let shouldContinue = res.write(
        chance.string({ length: (16 * 1024) - 1 })
      );

      if (!shouldContinue) {
        console.log('Backpressure');
        return res.once('drain', generateMore);
      }
    }

    res.end(`\nThe end...\n`, () => {
      console.log('All data sent');
    });
  }

  generateMore();

}).listen(8000, () => {
  console.log(`Listening on port 8000`);
});
