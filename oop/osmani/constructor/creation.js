function defineProp(obj, key, value) {
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };

  Object.defineProperty(obj, key, config);
}

var person = Object.create(Object.prototype);

defineProp(person, 'car', 'Delorean');
defineProp(person, 'dateOfBirth', '1981');
defineProp(person, 'hasBeard', true);

console.log(person);

// methods can be used for inheritance
var driver = Object.create(person);

defineProp(driver, 'topSpeed', '100mph');

// inherited
console.log(driver.dateOfBirth);

// new prop
console.log(driver.topSpeed);

