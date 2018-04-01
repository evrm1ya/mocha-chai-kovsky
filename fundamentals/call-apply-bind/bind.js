const util = require('util')
const events = require('events')

// bind()
//
// Use to call a function with `this` set explicitly.
//
// Easily set which object will be bound to `this`
// when a function or method is invoked.
//
// Use: needed when using `this` in a method, and the
// method is called from a receiver object.
//
// javascriptissexy.com

const objA = {
  a: 3,
  getA: function() {
    return this.a;
  }
}

const objB = {
  a: 4
}

console.log(objA.getA.bind(objB)())

// different Maybe functor implementation
function isNothing() {
  return this.__value === null || this.__value === undefined
}

function maybeMap(fn) {
  return this.isNothing(this.__value)
    ? Maybe.of(null)
    : Maybe.of(fn(this.__value))
}

function Maybe(x) {
  this.__value = x
  this.isNothing = isNothing.bind(this)
  this.map = maybeMap.bind(this)
}

Maybe.of = function(x) {
  return new Maybe(x)
}

const m1 = Maybe.of(1).map(v => null).isNothing()
console.log(m1)

// moz partially applied function examples
function list() {
  return Array.prototype.slice.call(arguments)
}

const list1 = list(1, 2, 3)

// function with a preset leading arg
const leadingThirtysevenList = list.bind(null, 37)

const list2 = leadingThirtysevenList()

const list3 = leadingThirtysevenList(1, 2, 3)

console.log(list1)
console.log(list2)
console.log(list3)

const add = (x, y) => x + y

const increment = add.bind(null, 1)

console.log(increment(3))

// dorking around now
const logger = {
  count: 0,
  updateCount: function() {
    this.count++
    console.log('Count: ', this.count)
  }
}

function LameEmitter(options) {
  events.EventEmitter.call(this)
  this.name = options.name
  this.logIt = this.logIt.bind(this)
}

LameEmitter.prototype.logIt = function(msg) {
  console.log(`${this.name}: ${msg}`)
}

util.inherits(LameEmitter, events.EventEmitter)

const lameEmitter = new LameEmitter({ name: 'lame1' })

lameEmitter.on('lame', logger.updateCount.bind(logger))
lameEmitter.emit('lame')
lameEmitter.emit('lame')
lameEmitter.emit('lame')

lameEmitter.on('moreLame', function(msg) {
  this.logIt(msg)  
})

lameEmitter.emit('moreLame', 'LAAAAME')
console.log(lameEmitter)

var hero = {
  _name: 'John Doe',
  getSecretIdentity: function() {
    return this._name;
  }
};

var stoleSecretIdentity = hero.getSecretIdentity;
var stoleSecretIdentity2 = hero.getSecretIdentity.bind(hero);

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
console.log(stoleSecretIdentity2());
