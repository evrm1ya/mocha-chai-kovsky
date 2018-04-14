class QueueNode {
  constructor(data, priority) {
    this.data = data
    this.next = null
    this.previous = null
    this.priority = priority
  }
}

class NodeBasedQueue {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  append(node) {
    this.tail.next = node
    node.previous = this.tail
    this.tail = node
  }

  prepend(node) {
    node.next = this.head
    this.head.previous = node
    this.head = node
  }

  insert(node) {
    let current = this.head

    // iterate until the priority is lower than node.priority
    // stop on lower priority node
    while (current.next && current.next.priority >= node.priority) {
      current = current.next
    }

    if (current === this.tail) {
      this.append(node)
    } else {
      node.next = current.next
      node.previous = current
      current.next.previous = node
      current.next = node
    }
  }

  enqueue(data, priority) {
    const node = new QueueNode(data, priority)

    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      if (!node.priority) {
        node.priority = 1
        this.append(node)
      } else if (node.priority > this.head.priority) {
        this.prepend(node)
      } else {
        this.insert(node)
      }
    }

    this.size++
  }

  dequeue() {
    if (!this.head) {
      return null
    }

    let data = this.head.data

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      this.size = 0
    } else {
      this.head = this.head.next
      this.head.previous = null
    }

    this.size--

    return data
  }

  print() {
    let current = this.head
    let result = []

    while (current) {
      result.push(current.data)
      current = current.next
    }

    console.log('NodeBasedQueue:', result)
  }
}

module.exports = NodeBasedQueue

