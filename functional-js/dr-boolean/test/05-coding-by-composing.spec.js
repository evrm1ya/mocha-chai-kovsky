import test from 'tape';
import sinon from 'sinon';
import {
  composeExample, shout, isAssociative,
  snakeCase, initials, isLastInStock,
  nameOfFirstCar, averageDollarValue,
  sanitizeNames, availablePrices, fastestCar
} from '../05-coding-by-composing';

test('composeExample', test => {
  const f = sinon.spy();
  const g = sinon.spy();
  const composed = composeExample(f, g);

  const p = sinon.stub().returns(1);
  const q = sinon.spy();
  const composed2 = composeExample(q, p);

  test.equal(
    typeof composed,
    'function',
    'it returns a function'
  );

  composed(1);

  sinon.assert.calledOnce(g);
  sinon.assert.calledOnce(f);

  composed2();

  test.equal(
    q.args[0][0],
    1,
    'the result of second function is passed to the first function'
  );

  test.end();
});

test('shout', test => {
  test.equal(
    shout('send in the clowns'),
    'SEND IN THE CLOWNS!'
  );

  test.end();
});

test('isAssociative', test => {
  const f = x => x * 2;
  const g = x => x + 1;
  const h = x => x * x;

  test.ok(isAssociative(f, g, h, 2));

  const x = s => s + '3';
  const y = s => s + '2';
  const z = s => s + '1';

  test.ok(isAssociative(x, y, z, 'testing '));

  test.end();
});

test('snakeCase', test => {
  test.equal(
    snakeCase('foo bar baz'), 
    'foo_bar_baz'
  );

  test.equal(
    snakeCase('  Foo  Bar  Baz  '), 
    '_foo_bar_baz_'
  );

  test.end();
});

test('initials', test => {
  test.equal(
    initials('Kareem Abdul Jabar'),
    'K. A. J. '
  );

  test.end();
});

// Example Data
const CARS = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true,
}, {
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false,
}, {
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false,
}, {
  name: 'Audi R8',
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false,
}, {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
}, {
  name: 'Pagani Huayra',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: false,
}];

test('isLastInStock', test => {
  test.notOk(isLastInStock(CARS));
  test.end();
});

test('nameOfFirstCar', test => {
  test.equal(
    nameOfFirstCar(CARS),
    'Ferrari FF'
  );

  test.end();
});

test('averageDollarValue', test => {
  test.equal(
    averageDollarValue(CARS),
    790700
  );

  test.end();
});

test('sanitizeNames', test => {
  test.deepEqual(
    sanitizeNames(CARS),
    [
      'ferrari_ff',
      'spyker_c12_zagato',
      'jaguar_xkr_s',
      'audi_r8',
      'aston_martin_one_77',
      'pagani_huayra'
    ]
  );

  test.end();
});

test('availablePrices', test => {
  test.equal(
    availablePrices(CARS),
    '$700,000.00, $1,850,000.00'
  );

  test.end();
});

test('fastestCar', test => {
  test.equal(
    fastestCar(CARS),
    'Aston Martin One-77 is the fastest'
  );

  test.end();
});

