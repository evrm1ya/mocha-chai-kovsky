const EventEmitter = require('events').EventEmitter
const util = require('util')

// call()
// Provides the `this` context to a function and
// invokes it. Pass additional comma separated args.

// Chaining constructors
function CallEmitter() {
  EventEmitter.call(this)
  console.log(this)
}

util.inherits(CallEmitter, EventEmitter)

const callEmitter = new CallEmitter()

console.log(callEmitter.constructor)
console.log(Object.getOwnPropertyNames(callEmitter))

function Product(name, price) {
  this.name = name
  this.price = price
  this.nameAndPrice = nameAndPrice.bind(this)
}

function nameAndPrice() {
  return `Name: ${this.name}, Price: ${this.price}`
}

// Product.prototype.nameAndPrice = function() {
//   return `Name: ${this.name}, Price: ${this.price}`
// }

// util.inherits(Food, Product)

function Food(name, price) {
  Product.call(this, name, price)
  this.sellByDate = new Date()
}

function Toy(name, price, minimumAge) {
  Product.call(this, name, price)
  this.minimumAge = minimumAge || null
}

const cheese = new Food('feta', 5)
const robot = new Toy('robot', 40)
const robot2 = new Toy('robot2', 50, 0) 

console.log(cheese)
console.log(cheese.nameAndPrice())
console.log(cheese.constructor)

console.log(robot2)
console.log(robot2.nameAndPrice())

function logName() {
  console.log(this.name)
}

const arr = [cheese, robot, robot2]

arr.forEach(product => { logName.call(product) })

