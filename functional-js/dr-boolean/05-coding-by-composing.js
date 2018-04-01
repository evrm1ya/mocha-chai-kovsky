import { 
  toUpper, compose, replace,
  toLower, join, map, head,
  split, append, curry, prop,
  last, reduce, add, filter,
  flip, sortBy
} from 'ramda';
import accounting from 'accounting';

export const composeExample = (f, g) => x => f(g(x));

const exclaim = x => `${x}!`;

export const shout = composeExample(exclaim, toUpper);

export const isAssociative = (f, g, h, x) =>
  composeExample(f, composeExample(g, h))(x) === 
  composeExample(composeExample(f, g), h)(x);

// Pointfree
// functions that never mention the data
// upon which they operate

const spaceToUnderscore = replace(/\s+/ig, '_');

export const snakeCase = compose(
  toLower,
  spaceToUnderscore
);

export const initials = compose(
  join('. '),
  append(['']),
  map(compose(toUpper, head)),
  split(' ')
);

export const trace = curry((tag, x) => { 
  console.log(tag, x);
  return x;
});

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
//var isLastInStock = function(cars) {
//  var last_car = _.last(cars);
//  return _.prop('in_stock', last_car);
//};

// is last car in list of cars in stock
export const isLastInStock = compose(
  prop('in_stock'),
  last
);

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
//var nameOfFirstCar = undefined;

export const nameOfFirstCar = compose(
  prop('name'),
  head
);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.

var _average = function(xs) {
  return reduce(add, 0, xs) / xs.length;
}; // <- leave be

//var averageDollarValue = function(cars) {
//  var dollar_values = _.map(function(c) {
//    return c.dollar_value;
//  }, cars);
//  return _average(dollar_values);
//};

export const averageDollarValue = compose(
  _average,
  map(prop('dollar_value'))
);

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that 
// returns a list of lowercase and underscored car's names: 
// e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) 
// //=> ['ferrari_ff'].

// leave this alone and use to sanitize
var _underscore = replace(/\W+/g, '_'); 

//var sanitizeNames = undefined;
export const sanitizeNames = map(compose(
  toLower,
  _underscore,
  prop('name')
));

// Bonus 1:
// ============
// Refactor availablePrices with compose.

//var availablePrices = function(cars) {
//  var available_cars = _.filter(_.prop('in_stock'), cars);
//  return available_cars.map(function(x) {
//    return accounting.formatMoney(x.dollar_value);
//  }).join(', ');
//};

const formattedDollarValue = compose(
  accounting.formatMoney,
  prop('dollar_value')
);

export const availablePrices = compose(
  join(', '),
  map(formattedDollarValue),
  filter(prop('in_stock'))
);

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

//var fastestCar = function(cars) {
//  var sorted = _.sortBy(function(car) {
//    return car.horsepower;
//  }, cars);
//  var fastest = _.last(sorted);
//  return fastest.name + ' is the fastest';
//};

export const fastestCar = compose(
  car => `${prop('name', car)} is the fastest`,
  last,
  sortBy(prop('horsepower'))
);

