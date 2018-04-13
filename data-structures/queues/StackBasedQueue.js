const Stack = require('../stacks/Stack')

class StackBasedQueue {
  constructor() {
    this.inboundStack = new Stack() 
    this.outboundStack = new Stack()
  }

  getInboundStack() {
    return this.inboundStack
  }

  getOutboundStack() {
    return this.outboundStack
  }

  enqueue(data) {
    this.inboundStack.push(data)
  }

  dequeue() {
    if (this.outboundStack.size === 0) {
      while (this.inboundStack.size > 0) {
        this.outboundStack.push(this.inboundStack.pop())
      }
    }

    return this.outboundStack.pop()
  }

  print() {
    console.log('inboundStack')
    this.inboundStack.print()

    console.log('outboundStack')
    this.outboundStack.print()
  }
}

module.exports = StackBasedQueue

