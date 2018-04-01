(function() {
  var a = b = 3;
})();

console.log('a defined? ' + (typeof a !== 'undefined'));
//=> false
console.log('b defined? ' + (typeof b !== 'undefined'));
//=> true

// b = 3;
// var a = b;

//(function() {
//  'use strict';
//  var x = y = 3;
//})();

//=> y is not defined

