const subject = {
  hello: () => 'hello'
};

function createProxy(subject) {
  const helloOriginal = subject.hello;
  subject.hello = () => helloOriginal.call(this) + ' world';

  return subject;
}

const proxied = createProxy(subject);

console.log(proxied.hello());

