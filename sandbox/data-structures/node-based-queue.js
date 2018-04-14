const NodeBasedQueue = require('../../data-structures/queues/NodeBasedQueue')

const q1 = new NodeBasedQueue()

q1.enqueue('A', 3)
q1.print()
q1.enqueue('B', 2)
q1.enqueue('C', 1)
q1.enqueue('D')
q1.enqueue('E', 4)
q1.print()

q1.enqueue('F', 2)
q1.print()

q1.enqueue('G', 3)
q1.print()

// [E, A, G, B, F, C, D]

const q2 = new NodeBasedQueue()

q2.enqueue('A', 3)
console.log(q2.dequeue())

q2.enqueue('B', 3)
q2.enqueue('C', 2)
console.log(q2.dequeue())
q2.print()
console.log(q2)

q2.enqueue('D', 1)
console.log(q2)

q2.enqueue('E', 1)
console.log(q2)
