var myRevealingModule = (function() {
  var privateVar = 'ben cherry';
  var publicVar = 'Hey there'

  function privateFunction() {
    console.log('Name:' + privateVar);
  }

  function publicSetName(strName) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  };
})();

myRevealingModule.setName('paul kinlan');
myRevealingModule.getName();
