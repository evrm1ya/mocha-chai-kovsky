import test from 'tape'
import LinkedList from '../../linked-lists/LinkedList'

test('LinkedList.append()', test => {
  const LL = new LinkedList()

  LL.append({ a: 1, b: 2 })

  test.deepEqual(
    LL,
    {
      length: 1,
      head: {
        element: { a: 1, b: 2 },
        next: null
      }
    },
    'should append a head'
  )

  LL.append({ a: 3, b: 4 })

  test.deepEqual(
    LL,
    {
      length: 2,
      head: {
        element: { a: 1, b: 2 },
        next: {
          element: { a: 3, b: 4 },
          next: null
        }
      }
    },
    'should append the next element'
  )

  test.end()
})

test('LL.fromArray()', test => {
  const LL = new LinkedList()

  LL.fromArray([1, 2, 3])

  test.deepEqual(
    LL,
    {
      length: 3,
      head: {
        element: 1,
        next: {
          element: 2,
          next: {
            element: 3,
            next: null
          }
        }
      }
    },
    'should create a Linked List from an array'
  )

  test.end()
})

test('LL.removeAt', test => {
  const LL = new LinkedList()

  LL.fromArray([1, 2, 3])
  const head = LL.removeAt(0)

  test.deepEqual(
    LL,
    {
      head: {
        element: 2,
        next: { element: 3, next: null }
      },
      length: 2
    },
    'it removes the head'
  )

  test.equal(
    head,
    1,
    'it returns the element'
  )

  LL.removeAt(1)

  test.deepEqual(
    LL,
    {
      head: {
        element: 2,
        next: null
      },
      length: 1
    },
    'it removes elements not at the head'
  )

  const LL2 = new LinkedList()
  LL2.fromArray([4, 5, 6])
  const tail = LL2.removeAt(2)

  test.deepEqual(
    LL2,
    {
      head: {
        element: 4,
        next: {
          element: 5,
          next: null
        }
      },
      length: 2
    },
    'it removes the tail'
  )

  test.end()
})

test('LL.indexOf', test => {
  const LL = new LinkedList()

  LL.fromArray([
    { a: 1, b: 2 },
    { a: 3, b: 4 },
    { a: 5, b: 6 }
  ])

  test.equal(
    LL.indexOf(e => e.a === 3),
    1,
    'should return an element\'s index'
  )

  test.equal(
    LL.indexOf(e => e.b === 7),
    -1,
    'should return -1 by default'
  )

  test.end()
})

test('LL.insert()', test => {
  const LL = new LinkedList()

  LL.fromArray([1, 2])

  LL.insert(2, 3)

  test.deepEqual(
    LL,
    {
      length: 3,
      head: {
        element: 1,
        next: {
          element: 2,
          next: {
            element: 3,
            next: null
          }
        }
      }
    },
    'inserts at the end'
  )

  LL.insert(2, 4)

  test.deepEqual(
    LL,
    {
      length: 4,
      head: {
        element: 1,
        next: {
          element: 2,
          next: {
            element: 4,
            next: {
              element: 3,
              next: null
            }
          }
        }
      }
    },
    'it inserts in the middle'
  )

  LL.insert(0, 5)

  test.deepEqual(
    LL,
    {
      length: 5,
      head: {
        element: 5,
        next: {
          element: 1,
          next: {
            element: 2,
            next: {
              element: 4,
              next: {
                element: 3,
                next: null
              }
            }
          }
        }
      }
    },
    'it inserts in the beginning'
  )

  test.end()
})

test('LL.remove()', test => {
  const LL = new LinkedList()

  LL.fromArray([1, 2, 3])

  const result = LL.remove(e => e === 2)

  test.equal(
    result,
    2
  )

  test.deepEqual(
    LL,
    {
      length: 2,
      head: {
        element: 1,
        next: {
          element: 3,
          next: null
        }
      }
    }
  )

  test.end()
})

test('LL.toString()', test => {
  const LL = new LinkedList()
  LL.fromArray([1, 2, 3])

  test.equal(
    LL.toString(),
    '1\n2\n3'
  )

  test.end()
})
