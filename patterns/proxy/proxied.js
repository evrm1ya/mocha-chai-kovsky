const createProxy = require('./createProxy');

function Subject() { }

Subject.prototype.hello = function() {
  return 'hello';
};

Subject.prototype.goodbye = function() {
  console.log([].slice.call(arguments).join(' '));
};

const proxied = createProxy(new Subject());

console.log(proxied.hello());
proxied.goodbye('goodbye', 'world', 'hello', 'space');
