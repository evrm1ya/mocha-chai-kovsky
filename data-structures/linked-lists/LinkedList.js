/**
 * Node
 *   attrs
 *     element
 *     next
 * 
 * LinkedList
 *   attrs
 *     length
 *     head
 *
 *   methods
 *     append
 *     insert
 *     removeAt
 *     remove
 *     indexOf
 */

function Node(element) {
  this.element = element
  this.next = null
}

function LinkedList() {
  this.length = 0
  this.head = null
}

LinkedList.prototype.append = function(element) {
  var node = new Node(element)
  var current

  if (this.head === null) {
    this.head = node
  } else {
    current = this.head

    while (current.next) {
      current = current.next
    }

    current.next = node
  }

  this.length++
}

LinkedList.prototype.fromArray = function(array) {
  var max = array.length

  for (var i = 0; i < max; i++) {
    this.append(array[i])
  }
}

LinkedList.prototype.insert = function(position, element) {
  if (position < 0 || position > this.length) {
    return false
  }

  var node = new Node(element)
  var current = this.head
  var previous
  var index = 0

  if (position === 0) {
    node.next = current
    this.head = node
  } else {
    while (index++ < position) {
      previous = current
      current = current.next
    }

    node.next = current
    previous.next = node
  }

  this.length++

  return true
}

LinkedList.prototype.removeAt = function(position) {
  if (position < 0 || position > this.length) {
    return null
  }

  var current = this.head
  var previous
  var index = 0

  if (position === 0) {
    this.head = current.next;
  } else {
    while (index++ < position) {
      previous = current
      current = current.next
    }

    previous.next = current.next
  }

  this.length--

  return current.element
}

// Would normally just find the removeAt the indexOf the element
LinkedList.prototype.remove = function(comparator) {
  return this.removeAt(this.indexOf(comparator))
}

// Originally compares an element to node.element
// A comparator seemed more useful
LinkedList.prototype.indexOf = function(comparator) {
  var current = this.head
  var index = 0

  while (current) {
    if (comparator(current.element)) {
      return index
    }

    index++

    current = current.next
  }

  return -1
}

LinkedList.prototype.isEmpty = function() {
  return this.length === 0
}

LinkedList.prototype.size = function() {
  return this.length
}

LinkedList.prototype.toString = function() {
  var current = this.head
  var string = ''

  while (current) {
    string += current.element + (current.next ? '\n' : '')
    current = current.next
  }

  return string
}

LinkedList.prototype.print = function() {
  console.log(this.toString())
}

LinkedList.prototype.getHead = function() {
  return this.head
}

module.exports = LinkedList

