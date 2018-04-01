// LIFO
// Last In First Out
// Addition of new items or the removal of existing items
// takes place at the same end.
// Top => end of the stack (newest elements)
// Base => oldest elements

function Stack(items = []) {
  this.items = items
}

Stack.prototype.push = function(element) {
  this.items.push(element)
}

Stack.prototype.pop = function() {
  return this.items.pop()
}

Stack.prototype.peek = function() {
  return this.items[this.items.length - 1]
}

Stack.prototype.isEmpty = function() {
  return this.items.length === 0
}

Stack.prototype.clear = function() {
  this.items = []
}

Stack.prototype.size = function() {
  return this.items.length
}

Stack.prototype.print = function() {
  console.log(this.items.toString())
}

Stack.prototype.get = function() {
  return this.items
}

module.exports = Stack

