class BSTNode {
  constructor(data) {
    this.data = data
    this.leftChild = null
    this.rightChild = null
  }
}

class BST {
  constructor() {
    this.rootNode = null
  }

  // O(h) to find min or max
  findMin() {
    let current = this.rootNode

    while (current.leftChild) {
      current = current.leftChild
    }

    return current
  }

  findMax() {
    let current = this.rootNode

    while (current.rightChild) {
      current = current.rightChild
    }

    return current
  }

  // O(h)
  insert(data) {
    const node = new BSTNode(data)

    if (!this.rootNode) {
      this.rootNode = node
    } else {
      let current = this.rootNode
      let parent = null

      while (true) {
        parent = current

        if (node.data < current.data) {
          current = current.leftChild

          if (!current) {
            parent.leftChild = node
            return
          }
        } else {
          current = current.rightChild

          if (!current) {
            parent.rightChild = node
            return
          }
        }
      }
    }
  }

  getNodeWithParent(data) {
    let parent = null
    let current = this.rootNode

    if (!current) {
      return [null, null]
    }

    while (true) {
      if (current.data === data) {
        return [parent, current]
      } else if (current.data > data) {
        parent = current
        current = current.leftChild
      } else {
        parent = current
        current = current.rightChild
      }
    }

    return [parent, current]
  }

  remove(data) {
    [parent, node] = this.getNodeWithParent(data)

    if (!parent && !node) {
      return false
    }

    let childrenCount = 0

    if (node.leftChild && node.rightChild) {
      childrenCount = 2
    } else if (!node.leftChild && !node.rightChild) {
      childrenCount = 0
    } else {
      childrenCount = 1
    }

    if (childrenCount === 0) {
      if (parent) {
        if (parent.rightChild === node) {
          parent.rightChild = null
        } else {
          parent.leftChild = null
        }
      } else {
        this.rootNode = null
      }
    } else if (childrenCount === 1) {
      // nextNode used to keep track of where the
      // single node pointed to by the node we want
      // to delete is
      let nextNode = null

      if (node.leftChild) {
        nextNode = node.leftChild
      } else {
        nextNode = node.rightChild
      }

      if (parent) {
        if (parent.leftChild === node) {
          parent.leftChild = nextNode
        } else {
          parent.rightChild = nextNode
        }
      } else {
        this.rootNode = nextNode
      }
    } else {
      let parentOfLeftMostNode = null
      // need to find the next biggest successor
      // go right first
      let leftMostNode = node.rightChild

      while (leftMostNode.leftChild) {
        parentOfLeftMostNode = leftMostNode
        leftMostNode = leftMostNode.leftChild
      }

      // when we get to the leftMostNode, it will
      // either be a leaf node or have a right child

      // update node about to be removed with value
      // of in-orer successor
      node.data = leftMostNode.data

      if (parentOfLeftMostNode.leftChild === leftMostNode) {
        parentOfLeftMostNode.leftChild = leftMostNode.rightChild
      } else {
        parentOfLeftMostNode.rightChild = leftMostNode.rightChild
      }
    }
  }

  search(data) {
    let current = this.rootNode

    while (true) {
      if (!current) {
        return null
      } else if (current.data === data) {
        return data
      } else if (current.data > data) {
        current = current.leftChild
      } else {
        current = current.rightChild
      }
    }
  }

  _inorder(node, accum = []) {
    if (!node) {
      return
    }

    this._inorder(node.leftChild, accum)
    accum.push(node.data)
    this._inorder(node.rightChild, accum)

    return accum
  }

  inorder() {
    return this._inorder(this.rootNode, [])
  }

  _preorder(node, accum = []) {
    if (!node) {
      return
    }

    accum.push(node.data)
    this._preorder(node.leftChild, accum)
    this._preorder(node.rightChild, accum)

    return accum
  }

  preorder() {
    return this._preorder(this.rootNode, [])
  }

  _postorder(node, accum = []) {
    if (!node) {
      return
    }

    this._postorder(node.leftChild, accum)
    this._postorder(node.rightChild, accum)
    accum.push(node.data)

    return accum
  }

  postorder() {
    return this._postorder(this.rootNode, [])
  }

  breadthFirst() {
    // could use a queue instead
    let listOfNodes = []
    let traversalQueue = [this.rootNode]

    while (traversalQueue.length) {
      let node = traversalQueue.shift()
      listOfNodes.push(node.data)

      if (node.leftChild) {
        traversalQueue.push(node.leftChild)
      }

      if (node.rightChild) {
        traversalQueue.push(node.rightChild)
      }
    }

    return listOfNodes

  }
}

const tree = new BST()
const nums = [5, 3, 7, 9, 1, 2, 4, 6, 17, 8]
nums.forEach(num => tree.insert(num))

for (let i = 0; i < 10; i++) {
  let found = tree.search(i)
  console.log(`${i}:`, found)
}

console.log(tree.inorder())
console.log(tree.preorder())
console.log(tree.postorder())
console.log(tree.breadthFirst())
