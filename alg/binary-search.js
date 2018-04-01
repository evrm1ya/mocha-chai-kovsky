const primes = [
  2, 3, 5, 7, 11, 13, 17, 19,
  23, 29, 31, 37, 41, 43, 47,
  53, 59, 61, 67, 71, 73, 79,
  83, 89, 97
]

const averageRoundedDown = (x, y) => Math.floor((x + y) / 2)

const binarySearch = (items, target) => {
  let min = 0
  let max = items.length - 1
  let average
  let numGuesses = 0

  while (max >= min) {
    average = averageRoundedDown(max, min)
    numGuesses++

    if (items[average] === target) {
      console.log('numGuesses:', numGuesses)
      return average
    }

    if (items[average] < target) {
      min = average + 1
      continue
    }

    max = average - 1
  }

  console.log('numGuesses:', numGuesses)
  return -1
}

console.log(binarySearch(primes, 67))
console.log(binarySearch(primes, 73))
console.log(binarySearch(primes, 97))
console.log(binarySearch(primes, 7))
console.log(binarySearch(primes, 10))
