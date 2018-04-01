import {
  compose,
  curry
} from 'ramda';

// Container with one property
// not limited to one
//
// __value cannot be a specific type
//
// could access data with __value but not going to
const Container = function(x) {
  this.__value = x;
};

Container.of = function(x) {
  return new Container(x);
};

// Functor
// a type that implements map and obeys some laws

// (a -> b) -> Container a -> Container b
Container.prototype.map = function(f) {
  return Container.of(f(this.__value));
};

const Maybe = function(x) {
  this.__value = x;
};

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
  return this.isNothing() 
    ? Maybe.of(null) 
    : Maybe.of(f(this.__value));
};

// fMap :: Functor f => (a -> b) -> f a -> f b
const fMap = curry((f, functor) => functor.map(f));

// Use cases
// Maybe in functions that might fail to return a result
// Forced to deal with null values
// Safer software

// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0]);

// To use a value
const maybe = curry((x, f, m) => {
  return m.isNothing()
    ? x
    : f(m.__value)
});

// Pure error handling
// throw / catch is not pure

const Left = function(x) {
  this.__value = x;
};

Left.of = function(x) {
  return new Left(x);
};

Left.prototype.map = function(f) {
  return this;
};

const Right = function(x) {
  this.__value = x;
};

Right.of = function(x) {
  return new Right(x);
};

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
};

// IO
// __value is always a function
// delays impure action by wrapping it in a function wrapper
// think of this containing the return value, not the wrapper
// the wrapper avoids evaluation
const IO = function(f) {
  this.__value = f;
};

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
};

// mapped functions get tacked on the end of a
// computation we're building up
IO.prototype.map = function(f) {
  return new IO(compose(f, this.__value));
};

module.exports = {
  Container,
  Maybe,
  fMap,
  safeHead,
  maybe,
  Left,
  Right,
  IO
};

