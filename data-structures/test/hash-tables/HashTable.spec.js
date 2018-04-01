const test = require('tape');
const HashTable = require('../../hash-tables/HashTable');

test('HashTable', test => {
  const ht = new HashTable();
  ht.put('abc', 1);
  ht.put('def', 2);

  test.equal(ht.get('abc'), 1);
  test.equal(ht.get('def'), 2);

  ht.remove('def');

  test.equal(ht.get('def'), undefined);

  test.end();
});


