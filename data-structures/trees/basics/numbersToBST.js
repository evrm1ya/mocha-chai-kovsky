const BST = require('./BinarySearchTree')

function numbersToBST(numbers) {
  const bst = new BST()

  numbers.forEach(number => bst.insert(number))

  return bst
}

module.exports = numbersToBST

