(function() {
  console.log(1);
})();

!function() {
  console.log(2);
}();

(function() {
  var a = 3;

  console.log(a);
})();

// ReferenceError
// console.log(a)

var foo = {};

(function($) {
  $.a = 4
})(foo);

console.log(foo.a);

(function() {
  var a = 5;

  console.log(a);
}());
