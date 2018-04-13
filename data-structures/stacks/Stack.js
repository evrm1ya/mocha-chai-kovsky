class StackNode {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.size = 0
  }

  push(data) {
    const node = new StackNode(data)

    if (this.top) {
      node.next = this.top
    }

    this.top = node

    this.size++
  }

  pop() {
    if (!this.top) {
      return null
    }

    const data = this.top.data

    if (this.top.next) {
      this.top = this.top.next
    } else {
      this.top = null
    }

    this.size--

    return data
  }

  peek() {
    if (!this.top) {
      return null
    }

    return this.top[this.size - 1]
  }

  print() {
    if (!this.top) {
      return null
    }

    let current = this.top

    console.log('top')

    while (current) {
      console.log(current.data)
      current = current.next
    }

    console.log('bottom')
  }
}

module.exports = Stack

