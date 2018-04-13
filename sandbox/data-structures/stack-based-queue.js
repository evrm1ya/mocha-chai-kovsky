const StackBasedQueue = require('../../data-structures/queues/StackBasedQueue')

const sbq = new StackBasedQueue()

sbq.enqueue(1)
sbq.enqueue(2)
sbq.enqueue(3)

console.log('queued')
sbq.print()

sbq.dequeue()

console.log('dequeued')
sbq.print()

sbq.enqueue(4)
sbq.enqueue(5)

console.log('queued 2')
sbq.print()

console.log('dequeued 3')
sbq.dequeue()
sbq.dequeue()
sbq.dequeue()
sbq.print()

