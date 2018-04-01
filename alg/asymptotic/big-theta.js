// n => size of the array
// maximum number of times the loop can run is n
// c1 =>
//   compare guess with n
//   compare array[guess] with target value
//   increment guess
// c2 (overhead) => 
//   initializing variables
//   possibly returning -1
//
// time for all n iterations => c1 * n + c2
// 
// worst case running time of linear search grows like
// the array size n
// big-Theta of n
function doLinearSearch(array, targetValue) {
  for (var guess = 0; guess < array.length; guess++) {
    if (array[guess] === targetValue) {
      return guess
    }
  }

  return -1
}

