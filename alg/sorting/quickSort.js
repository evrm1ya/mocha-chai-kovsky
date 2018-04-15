function partition(ary, firstIndex, lastIndex) {
  var pivot = ary[firstIndex]
  var pivotIndex = firstIndex
  var indexOfLastElement = lastIndex

  // position of last element in list which is
  // where we begin the search for the element
  // that is less than the pivot
  var lessThanPivotIndex = indexOfLastElement

  // position where we begin to look for element in array
  // that is greater than the pivot
  var greaterThanPivotIndex = firstIndex + 1

  while (true) {
    while (ary[greaterThanPivotIndex] < pivot &&
      greaterThanPivotIndex < lastIndex) {

      greaterThanPivotIndex++
    }

    while (ary[lessThanPivotIndex] > pivot &&
      lessThanPivotIndex >= firstIndex) {

      lessThanPivotIndex--
    }

    if (greaterThanPivotIndex < lessThanPivotIndex) {
      let temp = ary[greaterThanPivotIndex]

      // swap item at gtIndex with item at ltIndex
      ary[greaterThanPivotIndex] = ary[lessThanPivotIndex]
      ary[lessThanPivotIndex] = temp
    } else {
      break
    }
  }

  // exchange item at pivotIndex with item at ltIndex
  ary[pivotIndex] = ary[lessThanPivotIndex]
  ary[lessThanPivotIndex] = pivot

  return lessThanPivotIndex;
}

function quickSort(ary, first, last) {
  if (last - first <= 0) {
    return
  } else {
    partitionPoint = partition(ary, first, last)
    quickSort(ary, first, partitionPoint - 1)
    quickSort(ary, partitionPoint + 1, last)
  }
}

let arr1 = [43, 3, 77, 89, 4, 20]
quickSort(arr1, 0, 5)
console.log(arr1)

/**

after partitionPoint 1
[4, 3, 20, 43, 89, 77]
returns index 3

quickSort(ary, 0, 2)
partition(ary, 0, 2)
[4, 3, 20] -> [3, 4, 20]
returns index 1

quickSort(ary, 0, 0)
returns

2nd quickSort(ary, 4, 5)
partition(ary, 4, 5)
[89, 77] -> [77, 89]

quickSort(ary, 5, 5)
returns

*/


