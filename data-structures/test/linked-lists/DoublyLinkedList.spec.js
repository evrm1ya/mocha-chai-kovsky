const test = require('tape')
const DoublyLinkedList = require('../../linked-lists/DoublyLinkedList')

test('DLL.append()', test => {
  const dll = new DoublyLinkedList()
  dll.append(1)

  test.equal(
    dll.head.element,
    1,
    'should set head on first append'
  )

  test.equal(
    dll.tail.element,
    1,
    'should set tail on first append'
  )

  dll.append(2)

  test.equal(
    dll.tail.element,
    2,
    'should append to end'
  )

  test.equal(
    dll.head.next.element,
    2,
    'should set next on head'
  )

  test.equal(
    dll.tail.previous.element,
    1,
    'should set previous on tail'
  )

  test.equal(
    dll.length,
    2,
    'should increment length'
  )

  test.equal
  
  test.end()
})

test('DLL.find()', test => {
  // not in the book
  const dll = new DoublyLinkedList()

  const result = dll.find(e => e % 2 !== 0)

  test.equal(result, undefined, 'should return undefined')

  dll.append(2)
  dll.append(4)
  dll.append(5)
  dll.append(6)

  const result2 = dll.find(e => e % 2 !== 0)

  test.equal(result2, 5, 'should return the element')

  test.end()
})

test('DLL.insert()', test => {
  const DLL = new DoublyLinkedList()

  DLL.insert(0, 1)

  test.deepEqual(
    DLL,
    {
      length: 1,
      head: {
        element: 1,
        previous: null,
        next: null
      },
      tail: {
        element: 1,
        previous: null,
        next: null
      }
    },
    'should insert at beginning'
  )

  DLL.insert(0, 2)

  test.equal(
    DLL.head.element,
    2,
    'should insert at 0'
  )

  test.equal(
    DLL.head.next.element,
    1,
    'should insert at 0'
  )

  test.equal(
    DLL.tail.element,
    1,
    'should insert at 0'
  )

  test.equal(
    DLL.tail.previous.element,
    2,
    'should insert at 0'
  )

  DLL.insert(2, 3)

  test.equal(
    DLL.tail.element,
    3,
    'should insert at end'
  )

  test.equal(
    DLL.tail.previous.element,
    1,
    'should insert at end'
  )

  test.equal(
    DLL.tail.previous.next.element,
    3,
    'should insert at end'
  )

  DLL.insert(2, 4)

  test.equal(
    DLL.tail.previous.element,
    4,
    'should insert in middle'
  )

  DLL.insert(1, 5)

  test.equal(
    DLL.head.next.element,
    5,
    'should insert in middle'
  )

  test.end()
})

