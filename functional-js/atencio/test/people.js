const Person = require('../src/model/Person.js').Person;
const Address = require('../src/model/Address.js').Address;
const { TreeNode } = require('../src/03-few-data-structures-many-ops');

var p1 = new Person(
  '111-11-1111', 
  'Haskell', 
  'Curry', 
  1900, 
  new Address('US', null, 'Wichita')
);	

var p2 = new Person(
  '222-22-2222', 
  'Barkley', 
  'Rosser', 
  1907, 
  new Address('Greece', null, 'Athens')
);

var p3 = new Person(
  '333-33-3333', 
  'John', 
  'von Neumann', 
  1903, 
  new Address('Hungary', null, 'Budapest')
);

var p4 = new Person(
  '444-44-4444', 
  'Alonzo', 
  'Church', 
  1903, 
  new Address('US', null, 'Tulsa')
);

// yikes
const church = new TreeNode(new Person(1, 'Alonzo', 'Church'));
const rosser = new TreeNode(new Person(2, 'Barkley', 'Rosser'));
const mendelson = new TreeNode(new Person(3, 'Elliot', 'Mendelson'));
const sacks = new TreeNode(new Person(4, 'Gerald', 'Sacks'));
const turing = new TreeNode(new Person(5, 'Alan', 'Turing'));
const gandy = new TreeNode(new Person(6, 'Robin', 'Gandy'));
const kleene = new TreeNode(new Person(7, 'Stephen', 'Kleene'));
const nelson = new TreeNode(new Person(8, 'Nels', 'Nelson'));
const constable = new TreeNode(new Person(9, 'Robert', 'Constable'));

church.append(rosser).append(turing).append(kleene);
kleene.append(nelson).append(constable);
rosser.append(mendelson).append(sacks);
turing.append(gandy);

module.exports = {
  p1: p1,
  p2: p2,
  p3: p3,
  p4: p4,
  people1: [p1, p2, p3, p4],
  tree: church
};

