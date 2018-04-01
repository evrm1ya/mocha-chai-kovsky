function QueueElement(element, priority) {
  this.element = element
  this.priority = priority
}

function PriorityQueue() {
  this.items = []
}

// min priority queue
// adding the element with the lower index value to
// the front of the queue
PriorityQueue.prototype.enqueue = function(element, priority) {
  var queueElement = new QueueElement(element, priority)
  var added = false

  for (var i = 0; i < this.items.length; i++) {
    if (queueElement.priority < this.items[i].priority) {
      this.items.splice(i, 0, queueElement)
      added = true
      break
    }
  }

  if (!added) {
    this.items.push(queueElement)
  }
}

module.exports = PriorityQueue

