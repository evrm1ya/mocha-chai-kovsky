import test from 'tape'
import {
  prop
} from 'ramda'
import {
  createMap,
  collectionTo2DArray,
  createUIMap,
  reduxMap
} from './'

test('createMap', test => {
  const kvs = [
    [1, 2],
    [3, 4],
    [false, 0],
    ['five', 6]
  ]

  const result = createMap(kvs)

  test.deepEqual(
    [...result.keys()],
    [1, 3, false, 'five']
  )

  test.deepEqual(
    [...result.values()],
    [2, 4, 0, 6]
  )

  test.end()
})

test('collectionTo2DArray', test => {
  const mockCollection = [
    { id: 1, a: 2, b: [3, 4] },
    { id: 2, a: 'two', b: [1] },
    { id: 3, a: 'three', b: [1, 2] }
  ]

  test.deepEqual(
    collectionTo2DArray('id')(mockCollection),
    [
      [1, { id: 1, a: 2, b: [3, 4] }],
      [2, { id: 2, a: 'two', b: [1] }],
      [3, { id: 3, a: 'three', b: [1, 2] }]
    ]
  )

  test.end()
})

test('createUIStateMap', test => {
  const uiState = {
    selected: false,
    hidden: false
  }

  const mockMap = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
  ])

  const result = createUIMap(uiState, mockMap)

  test.deepEqual(
    [...result.keys()],
    [1, 2, 3]
  )

  test.deepEqual(
    [...result.values()],
    [
      { selected: false, hidden: false },
      { selected: false, hidden: false },
      { selected: false, hidden: false },
    ]
  )

  test.end()
})

test('reduxMap', test => {
  const mockCollection2 = [
    { id: 1, a: 'a', b: [2] },
    { id: 2, a: 'b', b: [1] },
    { id: 3, a: 'c', b: null }
  ]

  const uiState = {
    selected: false,
    hidden: false
  }

  const m = reduxMap(mockCollection2, 'id', uiState)

  const state1 = m.getState()

  test.deepEqual(
    [...state1.dataMap.keys()],
    [1, 2, 3]
  )

  test.deepEqual(
    [...state1.dataMap.values()],
    [
      { id: 1, a: 'a', b: [2] },
      { id: 2, a: 'b', b: [1] },
      { id: 3, a: 'c', b: null }
    ]
  )

  test.deepEqual(
    [...state1.uiMap.keys()],
    [1, 2, 3]
  )

  test.deepEqual(
    [...state1.uiMap.values()],
    [
      { selected: false, hidden: false },
      { selected: false, hidden: false },
      { selected: false, hidden: false }
    ]
  )

  m.update(2, { selected: true })
  const state2 = m.getState()

  test.deepEqual(
    [...state2.uiMap.values()],
    [
      { selected: false, hidden: false },
      { selected: true, hidden: false },
      { selected: false, hidden: false }
    ],
    '.update updates the desired uiMap state'
  )

  m.update(1, { selected: true, hidden: true })
  const state3 = m.getState()

  test.deepEqual(
    [...state3.uiMap.values()],
    [
      { selected: true, hidden: true },
      { selected: true, hidden: false },
      { selected: false, hidden: false }
    ],
    'future updates do not squash past updates'
  )

  m.reset()
  const state4 = m.getState()

  test.deepEqual(
    [...state4.uiMap.values()],
    [
      { selected: false, hidden: false },
      { selected: false, hidden: false },
      { selected: false, hidden: false }
    ],
    '.reset starts from scratch'
  )

  m.update(2, { selected: true })
  m.update(3, { selected: true })

  const filtered1 = m.filter({ selected: true })

  test.deepEqual(
    filtered1,
    [
      { id: 2, a: 'b', b: [1] },
      { id: 3, a: 'c', b: null }
    ],
    'SELECT * FROM dataMap WHERE selected = true'
  )

  const filtered2 = m.filter({ selected: false, hidden: false })
  test.deepEqual(
    filtered2,
    [ { id: 1, a: 'a', b: [2] } ],
    'SELECT * FROM dataMap WHERE selected = false AND hidden = false'
  )

  test.end()
})

test('reduxMap options', test => {
  const mockCollection = [
    { id: 5, a: 5 },
    { id: 3, a: 3 },
    { id: 4, a: 4 },
    { id: 1, a: 1 },
    { id: 2, a: 2 }
  ]

  const sortOptions = {
    sortByFn: prop('id')
  }

  const m1 = reduxMap(mockCollection, 'id', {}, sortOptions)

  const state = m1.getState()

  test.deepEqual(
    [...state.dataMap.keys()],
    [1, 2, 3, 4, 5],
    'dataMap is sorted based on sortByFn'
  )

  test.deepEqual(
    [...state.uiMap.keys()],
    [1, 2, 3, 4, 5],
    'uiMap is sorted based on sortByFn'
  )

  test.end()
})

