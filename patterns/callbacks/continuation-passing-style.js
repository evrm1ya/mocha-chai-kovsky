function add(a, b, callback) {
  callback(a + b);
}

console.log('before');
add(1, 2, result => console.log('Result: ' + result));
console.log('after');

function addAsync(a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
}

console.log('before');
addAsync(1, 2, result => console.log('Result: ' + result));
console.log('after');

