const test = require('tape')
const Queue = require('../../queues/Queue')

test('Queue.enqueue', test => {
  const q = new Queue()

  q.enqueue(1)

  test.deepEqual(
    q,
    {
      items: [1]
    },
    'should add element to queue'
  )

  q.enqueue(2)

  test.deepEqual(
    q,
    { items: [1, 2] }
  )

  test.end()
})

test('Queue.dequeue', test => {
  const q = new Queue()
  q.enqueue(1)
  q.enqueue(2)

  const result = q.dequeue()

  test.deepEqual(
    q,
    { items: [2] },
    'should remove element from front of queue'
  )

  test.equal(
    result,
    1,
    'should return element from front of queue'
  )

  test.end()
})

test('Queue.front', test => {
  const q = new Queue()
  q.enqueue({ a: 1, b: 2 })

  const result = q.front()

  test.deepEqual(
    result,
    { a: 1, b: 2 },
    'should return element at index 0'
  )

  test.deepEqual(
    q,
    { items: [{ a: 1, b: 2 }] },
    'should not remove element from queue'
  )

  result.a = 3

  test.deepEqual(
    q,
    { items: [{ a: 3, b: 2 }] },
    'can mutate items'
  )

  test.end()
})

