function Queue() {
  this.items = []
}

// Adds a new item (or several items) at the
// back of the queue.
Queue.prototype.enqueue = function(element) {
  this.items.push(element)
}

// Removes the first item from the queue.
// Returns the item.
Queue.prototype.dequeue = function() {
  return this.items.shift()
}

// Returns the first item from the queue.
// Does not remove the item.
// Mutable if item is mutable.
Queue.prototype.front = function() {
  return this.items[0]
}

Queue.prototype.isEmpty = function() {
  return this.items.length === 0
}

Queue.prototype.size = function() {
  return this.items.length
}

module.exports = Queue

