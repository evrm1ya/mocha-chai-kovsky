// destructuring
const surname = name => {
  const [first, last] = name;

  return last;
};

console.log(surname(['evan', 'vermilyea']));

// nested destructuring
const description = nameAndOccupation => {
  const [[first, last], occupation] = nameAndOccupation;

  return `${first} is a ${occupation}`;
};

console.log(description([['tom', 'hanks'], 'actor']));

// gathering
const [first, ...rest] = [1, 2, 3, 4, 5];

console.log(rest);

const date = new Date(...[2015, 1, 1]);
console.log(date);

const oneTwoThree = ['one', 'two', 'three'];
console.log(['zero', ...oneTwoThree]);

// destructuring parameters
const numbers = (...nums) => nums;
console.log(numbers(1, 2, 3, 4, 5));

const headAndTail = (head, ...tail) => [head, tail];
console.log(headAndTail(1, 2, 3, 4, 5));

// self-similarity
// can define a list by describing a rule for building lists
// 1) Empty, or
// 2) Consists of an element concatenated with a list

// [] is a list
// ['baz', ...[]] => ['baz']
// ['bar', ...['baz']] => ['bar', 'baz']
// ['foo', ...['bar', 'baz']] => ['foo', 'bar', 'baz']

// can use parallels between array literals + spreads
// with destructuring + rests to use above rules to decompose
// lists

const decompose = arr => {
  const [first, ...rest] = arr;
  console.log(first);
  console.log(rest);
};

decompose([]);
//=> undefined, []

decompose(['foo']);
//=> 'foo', []

decompose(['foo', 'bar']);
//=> 'foo', ['bar']

decompose(['foo', 'bar', 'baz']);
//=> 'foo', ['bar', 'baz']

const isEmpty = ([first, ...rest]) => first === undefined;

console.log(isEmpty([]));
console.log(isEmpty([0]));
console.log(isEmpty([[]]));

const length = ([first, ...rest]) =>
  first === undefined
    ? 0
    : 1 + length(rest);

console.log(length([1, 2, 3]));

// our definition of a list is recursive, and if a list is self-similar,
// it is natural to create an algorithm that is also self-similar

// Recursive algorithms follow the 'divide and conquer' strategy 
// for solving a problem:
// 1.) Divide the problem into smaller problems.
// 2.) If a smaller problem is solvable, solve the small problem.
// 3.) If a smaller problem is not solvable, divide and conquer the problem.
// 4.) When all small problems have been solved, compose the solutions into 
//     one big solution.

// Flatten an array
// Need a test for the terminal case
// If there is an empty array, don't flatten it.
// If an element isn't an array, don't flatten it and put this terminal case
// together with the rest of the solution directly.

console.log(Array.isArray('foo'));
console.log(Array.isArray(['foo']));

const flatten = ([first, ...rest]) => {
  if (first === undefined) {
    return [];
  }

  if (!Array.isArray(first)) {
    return [first, ...flatten(rest)];
  }

  return [...flatten(first), ...flatten(rest)];
};

console.log(flatten([1, [], [1, 2], [3, 4], [[5], [6]]]));

// Mapping
// Applying a fn to every element of an array

const squareAll = ([first, ...rest]) =>
  first === undefined
    ? []
    : [first * first, ...squareAll(rest)];

console.log(squareAll([9, 8, 7]));

const truthyAll = ([first, ...rest]) =>
  first === undefined
    ? []
    : [!!first, ...truthyAll(rest)];

console.log(truthyAll([0, null, false, true, 1, {}, []]));

const mapWith = (fn, [first, ...rest]) =>
  first === undefined
    ? []
    : [fn(first), ...mapWith(fn, rest)];

console.log(mapWith(x => x + 1, [1, 2, 3]));

