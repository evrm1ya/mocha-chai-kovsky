function createProxy(subject) {
  const proto = Object.getPrototypeOf(subject);

  function Proxy(subject) {
    this.subject = subject;
  }

  Proxy.prototype = Object.create(proto);

  // Proxied method
  Proxy.prototype.hello = function() {
    return this.subject.hello() + ' world';
  };

  // Delegated method
  Proxy.prototype.goodbye = function() {
    return this.subject.goodbye
      .apply(this.subject, arguments);
  };

  return new Proxy(subject);
}

// without pseudo-classical inheritance
//function createProxy(subject) {
//  return {
//    hello: () => subject.hello() + ' world',
//    goodbye: () => subject.goodbye.apply(subject, arguments);
//  };
//}

module.exports = createProxy;

