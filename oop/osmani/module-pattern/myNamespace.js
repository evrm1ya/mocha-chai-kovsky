var myNamespace = (function() {
  var myPrivateVar;
  var myPrivateMethod;

  myPrivateVar = 0;

  myPrivateMethod = function(foo) {
    console.log(foo);
  };

  return {
    myPublicVar: 'foo',

    myPublicFunction: function(bar) {
      myPrivateVar++;
      myPrivateMethod(bar);
    }
  };
})();

myNamespace.myPublicFunction('baz');
