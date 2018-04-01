// two sets of positive integers
// A = {a0, a1, ... , an-1}
// B = {b0, b1, ... , bm-1}
// a positive integer x is between sets A and B
// if the following conditions are satisfied:
// 1. All elements in A are factors of x
// 2. x is a factor of all elements in B
//
// x % ai === 0 for all ai in A
// bi % x === 0 for all bi in B
//
// Given A and B, find and print the number
// of integers that are between the two sets.

// constraints
// 1 <= n, m <= 10
// 1 <= ai <= 100
// 1 <= bi <= 100
//
// input
// n m
// a1 a2 an
// b1 b2 bn

const inputA1 = [2, 4]
const inputB1 = [16, 32, 96]

const a2 = [3, 9]
const b2 = [54, 81]

const testX = (a, b, x) => {
  return a.filter(val => x % val === 0).length === a.length &&
    b.filter(val => val % x === 0).length === b.length
}

const max = arr =>
  arr.reduce((accum, val) => {
    if (val > accum) {
      return val
    }

    return accum
  }, -Infinity)


console.log(max([5, 2, 9, 19, 19, 17]))

const solution = (a, b) => {
  var i = max(a.concat(b))
  var count = 0;
  var numIterations = 0
  var result = []

  while (i > 0) {
    if (testX(a, b, i)) {
      result.push(i)
      count++
    }

    numIterations++

    i--
  }

  return {
    numIterations,
    result,
    count
  }
}

console.log('First attempt:', solution(inputA1, inputB1))

// Second Iteration
const max2 = arr => Math.max.apply(this, arr)
const min = arr => Math.min.apply(this, arr)

const rangeOfXs= (a, b) => {
  let result = []
  let minimum = max(a)
  let maximum = min(b)

  for (let i = minimum; i <= maximum; i++) {
    result.push(i)
  }

  return result
}

const every = (fn, arr) => {
  let len = arr.length

  for (let i = 0; i < len; i++) {
    if (!fn(arr[i])) {
      return false
    }
  }

  return true
}

const aIsGood = (a, x) => every(num => x % num === 0, a)

const bIsGood = (b, x) => every(num => num % x === 0, b)

const solution2 = (a, b) => {
  let count = 0
  let xs = rangeOfXs(a, b)
  let len = xs.length
  let result = []
  let numIterations = 0

  for (let i = 0; i < len; i++) {
    numIterations++

    if (aIsGood(a, xs[i]) && bIsGood(b, xs[i])) {
      count++
      result.push(xs[i])
    }
  }

  return {
    numIterations,
    result,
    count
  }
}

console.log('Second attempt:', solution2(inputA1, inputB1))

// TODO: Read the editorial for a better solution.

