// To convert a decimal number to binary
// Divide number by 2 until the division result is 0
// 10 / 2 == 5 r == 0
// 5 / 2 == 2 r == 1
// 2 / 2 == 1 r == 0
// 1 / 2 == 0 r == 1
//
// Input: push remainders
// [0, 1, 0, 1]
// 
// Output: pop remainders
// [1, 0, 1, 0]
//  2     8    = 10

const Stack = require('./')

function divideBy2(n) {
  let remainderStack = new Stack()
  let remainder
  let binaryString = ''

  while (n > 0) {
    remainder = Math.floor(n % 2)
    remainderStack.push(remainder)
    n = Math.floor(n / 2)
  }

  while (!remainderStack.isEmpty()) {
    binaryString += remainderStack.pop().toString()
  }

  return binaryString
}

console.log(divideBy2(233))
//=> 11101001 = 128 + 64 + 32 + 8 + 1

console.log(divideBy2(10))

console.log(divideBy2(1000))
