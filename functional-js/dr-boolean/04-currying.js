import {
  curry,
  split,
  map,
  filter,
  test,
  reduce
} from 'ramda';

const replace = curry((regEx, replacement, str) => str.replace(regEx, replacement));

export const replaceHyphens = replace(/\-/g);
export const replaceEncodedColons = replace(/%3A/g, ':');

// Exercise 1
// Refactor to remove all arguments by partially applying the function
// export const words = str => split(' ', str);
export const words = split(' ');

// Exercise 1a
// Use map to make a new words fn that works on an array of strings
// var sentences = undefined;
export const sentences = map(words);

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

// var filterQs = function(xs) {
//   return _.filter(function(x) {
//     return match(/q/i, x);
//   }, xs);
// };

export const filterQs = filter(test(/q/i));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function(x, y) {
  return x >= y ? x : y;
};

// // REFACTOR THIS ONE:
// var max = function(xs) {
//   return _.reduce(function(acc, x) {
//     return _keepHighest(acc, x);
//   }, -Infinity, xs);
// };

export const max = reduce(_keepHighest, -Infinity);

// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
// var slice = undefined;

export const slice = curry((start, end, xs) => xs.slice(start, end));

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
// var take = undefined;

export const take = slice(0);

