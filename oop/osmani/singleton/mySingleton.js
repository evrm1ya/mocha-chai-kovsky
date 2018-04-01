// restricts instantiation to a single object
// classically - create a class with method that creates
// a new instance of the class if one doesn't exist
// if it exists, return a reference to that object
// can delay initialization
// don't provide a way for code that is unaware of a previous 
// reference to them to easily retrieve them
// structure is returned by Singleton - not class or object

var mySingleton = (function() {
  var instance;

  function init() {
    function privateMethod() {
      console.log('I am private');
    }

    var privateVariable = 'Im also private';

    var privateRandomNumber = Math.random();

    return {
      publicMethod: function() {
        console.log('the public can see me!');
      },

      publicProp: 'im also public',

      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

// applicability
// must be exactly one instance of a class, and must be accessible
// to clients from a well known access point
// when the sole instance should be extensible by subclassing, and clients
// should be able to use an extended instance without modifying their code

// will every applicatio use this class exactly the same way?
// will every applicatin ever need only one instance of this class?
// should the clients of this class be unaware of the application 
// they are a part of?

// classic example: logging service
