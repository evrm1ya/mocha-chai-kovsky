const Stack = require('./')

function baseConverter(n, base) {
  const stack = new Stack()
  let remainder
  let baseString = ''
  let digits = '0123456789ABCDEF'

  while (n > 0) {
    remainder = Math.floor(n % base)
    stack.push(remainder)
    n = Math.floor(n / base)
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()]
  }

  return baseString
}

console.log(baseConverter(100345, 2))
console.log(baseConverter(100345, 8))
console.log(baseConverter(100345, 16))
