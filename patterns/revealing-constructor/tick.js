const ticker = require('./ticker');

ticker.on('tick', tickCount => console.log(tickCount, 'Tick'));
// ticker.emit('something', {});

