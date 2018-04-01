// TODO: Finish .remove
// Tree terminology
//
// root => top node of a tree
// internal node => a node with at least one child
// external node => node that does not have children (leaf)
// levels => root at level 0, its children on level 1, ...
// height => deepest level where there are no children
// edge => connection between nodes

// BinarySearchTree
//
// Can only store nodes with lesser values on the left side
// Nodes with greater values on the right side

function Node(key) {
  this.key = key
  this.left = null
  this.right = null
}

function BinarySearchTree() {
  this.root = null
}

BinarySearchTree.prototype._insertNode = function(root, node) {
  if (node.key < root.key) {
    if (root.left === null) {
      root.left = node
    } else {
      this._insertNode(root.left, node)
    }
  } else {
    if (root.right === null) {
      root.right = node
    } else {
      this._insertNode(root.right, node)
    }
  }
}

BinarySearchTree.prototype.insert = function(key) {
  const node = new Node(key)

  if (this.root === null) {
    this.root = node
  } else {
    this._insertNode(this.root, node)
  }
}

BinarySearchTree.prototype.search = function(key) {
}

BinarySearchTree.prototype._inOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    this._inOrderTraverseNode(node.left, callback)
    callback(node.key)
    this._inOrderTraverseNode(node.right, callback)
  }
}

BinarySearchTree.prototype._inOrderTraverseNodeInReverse = function(node, callback) {
  if (node !== null) {
    this._inOrderTraverseNodeInReverse(node.right, callback)
    callback(node.key)
    this._inOrderTraverseNodeInReverse(node.left, callback)
  }
}

// Visits all nodes of a BST in an ascending order
// Useful for sorting a tree
BinarySearchTree.prototype.inOrderTraverse = function(callback, reverse) {
  if (reverse) {
    this._inOrderTraverseNodeInReverse(this.root, callback)
  } else {
    this._inOrderTraverseNode(this.root, callback)
  }
}

BinarySearchTree.prototype._preOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    callback(node.key)
    this._preOrderTraverseNode(node.left, callback)
    this._preOrderTraverseNode(node.right, callback)
  }
}

// Visits the node prior to its descendants
// Useful to print a structured document
BinarySearchTree.prototype.preOrderTraverse = function(callback) {
  this._preOrderTraverseNode(this.root, callback)
}

BinarySearchTree.prototype._postOrderTraverseNode = function(node, callback) {
  if (node !== null) {
    this._postOrderTraverseNode(node.left, callback)
    this._postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }
}

BinarySearchTree.prototype.postOrderTraverse = function(callback) {
  this._postOrderTraverseNode(this.root, callback)
}

BinarySearchTree.prototype._minNode = function(node) {
  if (!node) {
    return null
  }

  while (node && node.left !== null) {
    node = node.left
  }

  return node.key
}

BinarySearchTree.prototype.min = function() {
  return this._minNode(this.root)
}

BinarySearchTree.prototype._maxNode = function(node) {
  if (!node) {
    return null
  }

  while (node && node.right !== null) {
    node = node.right
  }

  return node.key
}

BinarySearchTree.prototype.max = function() {
  return this._maxNode(this.root)
}

BinarySearchTree.prototype._searchNode = function(node, key) {
  if (node === null) {
    return false
  }

  if (key < node.key) {
    return this._searchNode(node.left, key)
  } else if (key > node.key ) {
    return this._searchNode(node.right, key)
  } else {
    return true
  }
}

BinarySearchTree.prototype.search = function(key) {
  return this._searchNode(this.root, key)
}

BinarySearchTree.prototype._removeNode = function(node, key) {
  if (node === null) {
    return null
  }

  if (key < node.key) {
    node.left = this._removeNode(node.left, key)
    return node
  } else if (key > node.key) {
    node.right = this._removeNode(node.right, key)
    return node
  } else {

    // case 1 - a leaf node
    if (node.left === null && node.right === null) {
      node = null
      return node
    }

    // case 2 - a node with only 1 child
    if (node.left === null) {
      node = node.right
      return node
    } else if (node.right === null) {
      node = node.left
      return node
    }

    // case 3 - a node with 2 children
    var aux = this._minNode(node)
    node.key = aux.key
    node.right = this._removeNode(node.right, aux.key)
    return node
  }
}

BinarySearchTree.prototype.remove = function(key) {
  this.root = this._removeNode(this.root, key)
}

BinarySearchTree.prototype.get = function() {
  return this.root
}

module.exports = BinarySearchTree

