import test from 'tape'
import BST from '../../trees/basics/BinarySearchTree'
import numbersToBST from '../../trees/basics/numbersToBST'

const numbers = [ 11, 7, 5, 9, 3, 6, 8, 10, 15, 13, 20, 12, 14, 18, 25 ]
const bst = numbersToBST(numbers)


test('BST', test => {
  const bst2 = new BST()

  test.deepEqual(
    bst2,
    { root: null },
    'instantiated with a null root'
  )

  bst2.insert(11)

  test.deepEqual(
    bst2,
    {
      root: {
        key: 11,
        left: null,
        right: null
      }
    },
    'first inserted node becomes the root'
  )

  bst2.insert(5)

  test.deepEqual(
    bst2,
    {
      root: {
        key: 11,
        left: { key: 5, left: null, right: null },
        right: null
      }
    },
    'it goes left'
  )

  bst2.insert(13)

  test.deepEqual(
    bst2,
    {
      root: {
        key: 11,
        left: { key: 5, left: null, right: null },
        right: { key: 13, left: null, right: null }
      }
    },
    'it goes right'
  )

  bst2.insert(12)

  test.deepEqual(
    bst2,
    {
      root: {
        key: 11,
        left: { key: 5, left: null, right: null },
        right: {
          key: 13,
          left: { key: 12, left: null, right: null },
          right: null
        }
      }
    },
    'it nests'
  )
    
  test.end()
})

test('BST.inOrderTraverse', test => {
  const sorted = []
  const reversed = []

  const cb = key => sorted.push(key)
  const cb2 = key => {
    reversed.push(key)
  }

  bst.inOrderTraverse(cb),
  bst.inOrderTraverse(cb2, true)

  test.deepEqual(
    sorted,
    [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25],
    'it sorts the tree\'s values'
  )

  test.deepEqual(
    reversed,
    [25, 20, 18, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 3],
    'it sorts in reverse'
  )

  test.end()
})

test('BST.preOrderTraverse', test => {
  const result = []

  const cb = key => result.push(key)

  bst.preOrderTraverse(cb)

  test.deepEqual(
    result,
    [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]
  )

  test.end()
})

test('BST.postOrderTraverse', test => {
  const result = []
  const cb = key => result.push(key)

  bst.postOrderTraverse(cb)

  test.deepEqual(
    result,
    [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]
  )

  test.end()
})

test('BST.min', test => {
  test.equal(
    bst.min(),
    3
  )

  test.end()
})

test('BST.max', test => {
  test.equal(
    bst.max(),
    25
  )

  test.end()
})

test('BST.search', test => {
  test.equal(
    bst.search(20),
    true,
    'should return true if a key is found'
  )

  test.equal(
    bst.search(30),
    false,
    'should return false if a key is not found'
  )

  test.end()
})

