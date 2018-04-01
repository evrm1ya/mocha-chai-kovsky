// Factory Pattern
// creational pattern
// doesn't explicitly require a constructor
// can provide a generic interface for creating objects
// where we can specify the type of factory object we wish
// to be created

// example uses a Constructor pattern to define cars

function Car(options) {
  this.doors = options.doors || 4;
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver';
}

function Truck(options) {
  this.state = options.state || 'used';
  this.wheelSize = options.wheelSize || 'large';
  this.color = options.color || 'blue';
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;

VehicleFactory.prototype.createVehicle = function(options) {
  switch (options.vehicleType) {
    case 'car':
      this.vehicleClass = Car;
      break;
    case 'truck':
      this.vehicleClass = Truck;
      break;
  };

  return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();

var car = carFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
  doors: 6
});

console.log(car instanceof Car);
console.log(car);

// subclass VehicleFactory to create a factory class that builds Trucks

function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();

var myBigTruck = truckFactory.createVehicle({
  state: 'omg..so bad',
  color: 'pink',
  wheelSize: 'so big'
});

console.log(myBigTruck instanceof Truck);
console.log(myBigTruck);

// When to use;
// object or component setup involves a high level of complexity
// need to easily generate different instances of objects depending
//   on the env we are in
// working with many small objects or components that share the same props
// composing objects with instances of other objects that need only 
//   satisfy an API contract (aka, Duck Typing) to work
//   useful for decoupling
