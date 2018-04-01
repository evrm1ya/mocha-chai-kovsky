import { 
  compose,
  sortBy,
  map,
  whereEq,
  prop
} from 'ramda'

export const createMap = kvs => new Map(kvs)

export const collectionTo2DArray = key => 
  map(item => [prop(key, item), item])

export const createUIMap = (uiState, dataMap) =>
  createMap(map(key => [key, uiState], [...dataMap.keys()]))

export const basicMap = key => compose(
  createMap,
  collectionTo2DArray(key)
)

export const sortedMap = (key, sortByFn) => compose(
  basicMap(key),
  sortBy(sortByFn)
)

export function reduxMap(collection, key, uiState, options = {}) {
  const { sortByFn } = options

  const dataMap = sortByFn
    ? sortedMap(key, sortByFn)(collection)
    : basicMap(key)(collection)

  let uiMap = createUIMap(uiState, dataMap)

  function getState() {
    return {
      dataMap,
      uiMap
    }
  }

  function update(key, newProps) {
    uiMap.set(
      key,
      Object.assign({}, uiMap.get(key), newProps)
    )
  }

  function reset() {
    uiMap = createUIMap(uiState, dataMap)
  }

  function filter(props) {
    return [...uiMap.entries()]
      .filter(([k, v]) => whereEq(props, v))
      .map(([k, v]) => k)
      .reduce((accum, k) => accum.concat(dataMap.get(k)), [])
  }

  return {
    getState,
    update,
    reset,
    filter
  }
}

