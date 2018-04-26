function swap(items, firstIndex, secondIndex) {
  let temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }

    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function quickSort(items, left, right) {
  let index;

  if (items.length > 1) {
    index = partition(items, left, right);

    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      quickSort(items, index, right);
    }
  }

  return items;
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


