class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.previous = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }

  append(element) {
    let node = new Node(element)

    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.previous = this.tail
      this.tail = node
    }

    this.length++
  }

  insert(position, element) {
    // check for out of bounds values
    if (position < 0 || position > this.length) {
      return false;
    }

    let node = new Node(element)
    let current = this.head
    let prev = this.previous
    let index = 0

    if (position === 0) {
      if (!this.head) {
        this.head = node
        this.tail = node
      } else {
        node.next = current
        current.previous = node
        this.head = node
      }
    } else if (position === this.length) {
      current = this.tail
      this.tail.next = node
      node.previous = current
      this.tail = node
    } else {
      while (index++ < position) {
        prev = current
        current = current.next
      }

      node.next = current
      prev.next = node

      current.previous = node
      node.previous = prev
    }

    this.length++

    return true
  }

  // Not part of spec
  find(fn) {
    let current = this.head

    if (!current) {
      return
    }

    while (current.next) {
      if (fn(current.element)) {
        return current.element
      }

      current = current.next
    }
  }
}

module.exports = DoublyLinkedList

