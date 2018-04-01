// apply()
// provide `this` and an array of arguments

// monkey-patching
// for built-in functions
const original = {
  a: 1,
  b: 2,
  add: function(x, y) {
    return x + y
  }
}

function patch() {
  let originalAdd = original.add

  original.add = function(x, y) {
    console.log(arguments)
    console.log(this)
    originalAdd.apply(this, arguments)
  }
}

patch()

original.add(1, 2)
console.log(original.add.toString())

// From ramda
// Curry functions using apply

function _arity(n, fn) {
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

function _isPlaceholder(a) {
  return a != null &&
    typeof a === 'object' &&
    a['@@functional/placeholder'] === true
}

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1
    } else {
      return fn.apply(this, arguments)
    }
  }
}

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2
      case 1:
        return _isPlaceholder(a)
          ? f2
          : _curry1(function(_b) {
              return fn(a, _b)
            })
      default:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f2
          : _isPlaceholder(a)
            ? _curry1(function(_a) {
                return fn(_a, b)
              })
            : _isPlaceholder(b)
              ? _curry1(function(_b) {
                  return fn(a, _b)
                })
              : fn(a, b)
    }
  }
}

function _curryN(length, received, fn) {
  return function() {
    var combined = []
    var argsIdx = 0
    var left = length
    var combinedIdx = 0

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result

      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx]
      } else {
        result = arguments[argsIdx]
        argsIdx += 1
      }

      combined[combinedIdx] = result

      if (!_isPlaceholder(result)) {
        left -= 1
      }

      combinedIdx += 1
    }

    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn))
  }
}

const curryN = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn)
  }

  return _arity(length, _curryN(length, [], fn))
})

const curry = _curry1(function curry(fn) {
  return curryN(fn.length, fn)
})

const add3Numbers = curry((x, y, z) => x + y + z)

console.log(add3Numbers(1)(2)(3))

