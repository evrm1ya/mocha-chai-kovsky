const _ = require('lodash');
const R = require('ramda');

module.exports.myMap = (arr, fn) => {
  let idx = 0;
  let len = arr.length;
  let result = new Array(len);

  while (idx < len) {
    result[idx] = fn(arr[idx], idx, arr);
    idx++
  }

  return result;
};

// reduce(f, [e0, e1, e2, e3], accum) 
// -> f(f(f(f(acc, e0), e1, e2, e3)))) -> R
// ?
module.exports.myReduce = (arr, fn, accum) => {
  let idx = 0;
  let len = arr.length;

  if (!accum && accum !== 0  && len > 0) {
    accum = arr[idx];
  }

  while (idx < len) {
    accum = fn(accum, arr[idx], idx, arr);
    idx++;
  }

  return accum;
};

// for working with person objects
// to get population with map reduce:
// _(people).map(getCountry).reduce(gatherStats, {});
module.exports.getCountry = person => person.address.country;

module.exports.gatherStats = (stat, criteria) => {
  stat[criteria] = _.isUndefined(stat[criteria])
    ? 1
    : stat[criteria] + 1;

  return stat;
  
};

// access props with a lens
// _(people).map(R.view(cityLens)).reduce(gatherStats, {});
const cityPath = ['address', 'city'];
module.exports.cityLens = R.lens(R.path(cityPath), R.assocPath(cityPath));

// validation functions
const isNotValid = val => _.isUndefined(val) || _.isNull(val);
module.exports.isNotValid = isNotValid;

const notAllValid = args => _(args).some(isNotValid);
module.exports.notAllValid = notAllValid;

const isValid = R.complement(isNotValid);
module.exports.isValid = isValid;

const allValid = args => _(args).every(isValid);
module.exports.allValid = allValid;

// filtering
// filter(p, [d0, d1, d2, ... dn]) -> [d0, d1, ... dn](subset of original)
module.exports.myFilter = (arr, predicate) => {
  let idx = -1;
  let length = arr.length;
  let result = [];

  while (++idx < length) {
    let value = arr[idx];
    if (predicate(value, idx, this)) {
      result.push(value);
    }
  }
  return result;
};

module.exports.bornIn1903 = person => person.birthYear === 1903;

class TreeNode {
  constructor(val) {
    this._val = val;
    this._parent = null;
    this._children = [];
  }

  isRoot() {
    return isValid(this._parent);
  }

  get children() {
    return this._children;
  }

  hasChildren() {
    return this._children.length > 0;
  }

  get value() {
    return this._val;
  }

  set value(val) {
    this._val = val;
  }

  append(child) {
    child._parent = this;
    this._children.push(child);
    return this;
  }

  toString() {
    return `Node (val ${this._val},
                  children: ${this._children.length})`;
  }
}

module.exports.TreeNode = TreeNode;

class Tree {
  constructor(root) {
    this._root = root;
  }

  // static method to avoid confusion with
  // array.prototype.map
  static map(node, fn, tree = null) {
    // invokes iterator to update value
    node.value = fn(node.value);

    if (tree === null) {
      tree = new Tree(node);
    }

    // base case
    // if the node has no children, don't continue
    if (node.hasChildren()) {
      _.map(node.children, function(child) {
        Tree.map(child, fn, tree);
      });
    }

    return tree;
  }

  get root() {
    return this._root;
  }
}

module.exports.Tree = Tree;

