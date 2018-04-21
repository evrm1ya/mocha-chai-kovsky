// adjacency list
const graph1 = {
  a: ['b', 'c'],
  b: ['e', 'a'],
  c: ['a', 'b', 'e', 'f'],
  e: ['b', 'c'],
  f: ['c']
}

// matrix
const matrixElements = Object.keys(graph1).sort()
const rowLength = matrixElements.length
const adjacencyMatrix = matrixElements.map(col => Array(rowLength).fill(0))

const edgesList = matrixElements.reduce((accum, key) => {
  graph1[key].forEach(node => accum.push([key, node]))

  return accum
}, [])

const index = {}

matrixElements.forEach((node, i) => {
  index[node] = i
})

edgesList.forEach(edges => {
  let colIndex = index[edges[0]]
  let rowIndex = index[edges[1]]

  adjacencyMatrix[colIndex][rowIndex] = 1
})

console.log(adjacencyMatrix)

