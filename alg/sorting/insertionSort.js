function insertionSort(ary) {
  const max = ary.length

  console.log('Start:')
  console.log(ary)

  for (let i = 1; i < ary.length; i++) {
    let insertValue = ary[i]
    let searchIndex = i

    while (searchIndex > 0 && ary[searchIndex - 1] > insertValue) {
      ary[searchIndex] = ary[searchIndex - 1]
      searchIndex--
    }

    ary[searchIndex] = insertValue

    console.log(ary)
  }

  return ary 
}

const ary1 = [5, 1, 100, 2, 10]

insertionSort(ary1)

