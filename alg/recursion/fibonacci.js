// Base case
// The fib of 1 or 2 is 1
// The fib of n where n > 2 is
//   the fib of (n-1) + the fib of (n-2)

function fibonacci(n) {
  return n <= 2
    ? 1
    : fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(8))
console.log(fibonacci(10))
//console.log(fibonacci(100))

function fibMemo(n, lookup = {}) {
  if (n <= 2) {
    lookup[n] = 1
  }

  if (!lookup[n]) {
    lookup[n] = fibMemo(n - 1, lookup) + fibMemo(n - 2, lookup)
  }

  return lookup[n]
}

console.log(fibMemo(8))
console.log(fibMemo(50))
console.log(fibMemo(100))

function fibTabulation(n) {
  let result = [1, 1]

  for (let i = 0; i < n - 2; i++) {
    let len = result.length
    result.push(result[len - 1] + result[len - 2])
  }

  return result
}

console.log(fibTabulation(8))

function fibMaxExclusive(max) {
  let result = [1, 1]
  let n = 0

  while (n < max) {
    let n2 = result[result.length - 1] + result[result.length - 2]

    if (n2 >= max) {
      return result
    }

    result.push(n2)
    n = n2
  }
}

console.log(fibMaxExclusive(8))
//console.log(fibMaxExclusive(4000000))

function* fibSeq() {
  let seq = [1, 1]

  while (true) {
    let len = seq.length
    seq.push(seq[len - 1] + seq[len - 2])
    yield seq
  }
}

const gen = fibSeq()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

function* fibGen() {
  let seq = []

  while (true) {
    let len = seq.length

    if (len < 2) {
      seq.push(1)
      yield seq[len]
    } else {
      seq.push(seq[len - 1] + seq[len - 2])
      yield seq[len]
    }
  }
}


const gen2 = fibGen()

for (let i = 0; i < 10; i++) {
  console.log(gen2.next())
}

