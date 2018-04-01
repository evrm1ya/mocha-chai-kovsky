var _ = require('underscore');

// can import globals and alias them
var myModule = (function(u) {
  function privateMethod() {
    console.log(u.min([10, 5, 100, 2, 1000]));
  }

  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})(_);

myModule.publicMethod();

