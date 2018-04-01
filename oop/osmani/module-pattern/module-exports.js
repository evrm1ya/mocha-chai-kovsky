var myModule = (function() {
  var module = {};
  var privateVariable = 'Hello World';

  function privateMethod() {
  }

  module.publicProperty = 'Foobar';

  module.publicMethod = function() {
    console.log(privateVariable);
  };

  return module;
})();

console.log(myModule);

