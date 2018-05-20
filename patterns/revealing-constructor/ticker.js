const ReadOnlyEE = require('./ReadOnlyEE');

const ticker = new ReadOnlyEE((emit) => {
  let tickCount = 0;
  setInterval(() => emit('tick', tickCount++), 1000);
});

module.exports = ticker;

