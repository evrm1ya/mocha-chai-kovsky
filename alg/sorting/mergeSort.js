// Divide n-element sequence to be sorted into 2 subsequences of n/2
// elements each
// Conquer: sort the 2 subsequences recursively using merge sort
// Combine: Merge the 2 sorted subsequences to produce the sorted answer
function merge(arr, p, q, r) {
  let n1 = q - p + 1;
  let n2 = r - q;
  let left = [];
  let right = [];

  for (let i = 0; i < n1; i++) {
    left.push(arr[p + i]);
  }

  for (let j = 0; j < n2; j++) {
    right.push(arr[q + j + 1]);
  }

  let k = p;
  let x = 0;
  let y = 0;

  while (k <= r) {
    if (!right[y] || left[x] <= right[y]) {
      arr[k] = left[x];
      x++;
    } else {
      arr[k] = right[y];
      y++;
    }

    k++;
  }
}

function mergeSort(arr, p, r) {
  if (p >= r) {
    return;
  }

  let q = Math.floor((p + r) / 2);

  mergeSort(arr, p, q);
  mergeSort(arr, q + 1, r);
  merge(arr, p, q, r);
}

const arr = [5, 2, 4, 7, 1, 3, 2, 6];
mergeSort(arr, 0, 7);
console.log(arr);

const arr2 = [5, 2, 4, 7, 3, 2, 6];
mergeSort(arr2, 0, 6);
console.log(arr2);
