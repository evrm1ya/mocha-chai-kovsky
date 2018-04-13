const Stack = require('../../data-structures/stacks/Stack.js')

const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)

stack.print()

stack.pop()

stack.print()

const openingRegEx = /\{|\[|\(/
const closingRegEx = /\}|\]|\)/

const closingMatch = {
  '}': '{',
  ')': '(',
  ']': '['
}

function checkBrackets(statement) {
  const stack = new Stack()

  for (let char of statement) {
    if (openingRegEx.test(char)) {
      stack.push(char)
      continue
    }

    if (closingRegEx.test(char)) {
      let last = stack.pop()

      console.log(`last: ${last} | char: ${char}`)

      if (last !== closingMatch[char]) {
        return false
      }
    }
  }

  stack.print()
  console.log(stack.size)

  if (stack.size > 0) {
    return false
  } else {
    return true
  }
}

const brackets = [
  '{ (foo) (bar) } [hello] (((this) is)a)test',
  '{(foo)(bar)}[hello](((this)is)atest',
  '{(foo)(bar)}[hello](((this)is)a)test))'
]

for (let b of brackets) {
  console.log(checkBrackets(b))
}

