import test from 'tape';
import { 
  Container,
  Maybe,
  fMap,
  safeHead,
  maybe,
  Left,
  Right,
  IO
} from '../08-tupperware';
import { 
  all, curry, compose,
  equals, filter, head, map,
  add, toUpper, concat,
  prop, split, last
} from 'ramda';

test('Container', test => {
  const c1 = Container.of(3);

  test.ok(c1 instanceof Container);

  test.deepEqual(
    c1,
    { __value: 3 }
  );

  const c2 = Container.of(Container.of({
    name: 'yoda'
  }));

  test.deepEqual(
    c2, 
    {
      __value: {
        __value: {
          name: 'yoda'
        }
      }
    }
  );

  const c3 = Container.of('flamethrowers').map(toUpper);

  test.deepEqual(
    c3,
    { __value: 'FLAMETHROWERS' }
  );

  const c4 = Container.of('bombs')
    .map(concat(' away'))
    .map(prop('length'));

  test.deepEqual(
    c4,
    { __value: 10 }
  );

  test.end();
});

test('Maybe', test => {
  const m1 = Maybe.of({
    name: 'Boris'
  }).map(prop('age')).map(add(10));

  test.deepEqual(
    m1,
    { __value: null }
  );

  const m2 = Maybe.of({
    name: 'Dinah',
    age: 14
  }).map(prop('age')).map(add(10));

  test.deepEqual(
    m2,
    { __value: 24 }
  );

  test.end();
});

test('fMap', test => {
  const m1 = Maybe.of({
    name: 'Boris',
    age: 30
  });

  const nameToUpper = compose(
    fMap(toUpper),
    fMap(prop('name'))
  );

  test.deepEqual(
    nameToUpper(m1),
    { __value: 'BORIS' }
  );

  test.end();
});

test('safeHead', test => {
  const streetName = compose(
    fMap(prop('street')),
    safeHead,
    prop('addresses')
  );

  test.deepEqual(
    streetName({ addresses: [] }),
    { __value: null }
  );

  test.deepEqual(
    streetName({
      addresses: [{
        street: 'Mulberry',
        number: 4201
      }]
    }),
    { __value: 'Mulberry' }
  );

  test.end();
});

test('withdraw example', test => {
  const withdraw = curry((amount, account) =>
    account.balance >= amount
      ? Maybe.of({ balance: account.balance - amount })
      : Maybe.of(null));

  test.deepEqual(
    withdraw(200, { balance: 100 }),
    { __value: null }
  );

  test.deepEqual(
    withdraw(20, { balance: 100 }),
    { __value: { balance: 80 } }
  );

  test.end();
});

test('maybe', test => {
  const m1 = Maybe.of(1);

  test.equal(
    maybe('default', x => x, m1),
    1
  );

  test.equal(
    maybe('default', x => x, safeHead([])),
    'default'
  );

  test.end();
});

test('Left / Right', test => {
  test.deepEqual(
    Right.of('rain').map(str => 'b' + str),
    { __value: 'brain' }
  );

  test.deepEqual(
    Left.of('rain').map(str => 'b' + str),
    { __value: 'rain' }
  );

  test.deepEqual(
    Right.of({ 
      host: 'localhost', 
      port: 80 
    }).map(prop('host')),
    { __value: 'localhost' }
  );

  test.deepEqual(
    Left.of({
      host: 'localhost',
      port: 80
    }).map(prop('host')),
    { __value: { host: 'localhost', port: 80 } }
  );

  test.end();
});

test('ifAllGreaterThan', test => {
  const ifAllGreaterThan = curry((value, fn, arr) => {
    if (all(x => x > value, arr)) {
      return Right.of(fn(arr));
    }

    return Left.of('All numbers were not > value');
  });

  const fail = ifAllGreaterThan(3, map(x => x * x), [1, 2, 3]);

  test.deepEqual(
    ifAllGreaterThan(3, map(x => x * x), [4, 5, 6]),
    { __value: [16, 25, 36] }
  );

  test.deepEqual(
    fail,
    { __value: 'All numbers were not > value' }
  );

  test.deepEqual(
    fail.map(map(x => x + 1)),
    { __value: 'All numbers were not > value' }
  );

  test.end();
});

test('IO', test => {
  const win = {
    location: {
      href: 'http://localhost:8000/blog/posts'
    },
    innerWidth: 500
  };

  const ioWindow = new IO(function() {
    return win;
  });

  test.equal(
    ioWindow.map(win => win.innerWidth).__value(),
    500
  );

  test.deepEqual(
    ioWindow.map(prop('location')).map(prop('href')).map(split('/')).__value(),
    ['http:', '', 'localhost:8000', 'blog', 'posts']
  );

  test.end();
});

test('IO - url example', test => {
  const win = {
    location: {
      href: 'http://localhost:3000/search?searchTerm=wafflehouse&test=1'
    }
  };

  const url = new IO(function() {
    return win.location.href;
  });

  const toPairs = compose(map(split('=')), split('&'));

  const params = compose(toPairs, last, split('?'));

  const findParam = function(key) {
    return map(compose(Maybe.of, filter(compose(equals(key), head)), params), url);
  };

  test.deepEqual(
    findParam('searchTerm').__value(),
    { __value: [ ['searchTerm', 'wafflehouse'] ] }
  );

  test.end();
});

