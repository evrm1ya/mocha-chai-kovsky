import Stack from '../../stacks/basics'
import test from 'tape'

test('Stack', test => {
  const s = new Stack()
  const s2 = new Stack([1, 0])

  test.deepEqual(s.get(), [], 'inits with empty items')
  test.deepEqual(s2.get(), [1, 0], 'inits with an array')

  s.push(1)
  s.push(2)
  test.deepEqual(s.get(), [1, 2], 'pushes items onto stack')

  test.equal(s.peek(), 2, '.peek returns top item')

  s.pop()
  test.deepEqual(s.get(), [1], 'pops item off stack')

  test.equal(s.isEmpty(), false, '.isEmpty returns false if items on stack')

  s.clear()
  test.equal(s.isEmpty(), true, '.clear empties stack')

  test.end()
})

