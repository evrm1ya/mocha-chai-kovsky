// constant time
function swap(array, firstIndex, secondIndex) {
  let value1 = array[firstIndex]
  array[firstIndex] = array[secondIndex]
  array[secondIndex] = value1
}

// first call - loop body runs n - 1 times
// second call - loop body runs n - 2 times
// ...
// last call - loop body runs 1 time
function indexOfMinimum(array, startIndex) {
  let minValue = array[startIndex]
  let minIndex = startIndex
  let len = array.length
  let numExecutions = 0

  for (let i = startIndex; i < len; i++) {
    if (array[i] < minValue) {
      minValue = array[i]
      minIndex = i
    }

    numExecutions++
  }

  console.log('indexOfMinimum numExecutions:', numExecutions)

  return minIndex
}

console.log(indexOfMinimum([1, 4, 2, 3], 1))
console.log(indexOfMinimum([1, 2, 4, 3], 1))
console.log(indexOfMinimum([1, 4, 3, 2], 1))

function selectionSort(array) {
  let len = array.length
  let minIdx

  for (let i = 0; i < len; i++) {
    minIdx = indexOfMinimum(array, i)
    swap(array, i, minIdx)
  }
}

let arr1 = [1, 4, 2, 3]
selectionSort(arr1)
console.log(arr1)

function min(array, startIndex) {
  let result = array[startIndex]
  let len = array.length

  for (let i = startIndex + 1; i < len; i++) {
    if (array[i] < result) {
      result = array[i]
    }
  }

  return result
}

function differentSort(array) {
  let result = []
  let len = array.length

  for (let i = 0; i < len; i++) {
    result.push(min(array, i))
  }

  return result
}

console.log(differentSort(arr1))
console.log(differentSort([]))
console.log(differentSort([1, 2, 3, 4]))

