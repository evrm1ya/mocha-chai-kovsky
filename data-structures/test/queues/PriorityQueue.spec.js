const test = require('tape')
const PriorityQueue = require('../../queues/PriorityQueue')

test('PriorityQueue.enqueue', test => {
  const q = new PriorityQueue()

  q.enqueue('c', 3)
  q.enqueue('a', 1)
  q.enqueue('b', 2)

  test.deepEqual(
    q,
    {
      items: [
        { element: 'a', priority: 1 },
        { element: 'b', priority: 2 },
        { element: 'c', priority: 3 }
      ]
    },
    'queues based on priority'
  )

  q.enqueue('hello', 1)

  test.deepEqual(
    q.items[1],
    { element: 'hello', priority: 1 }
  )

  test.end()
})

