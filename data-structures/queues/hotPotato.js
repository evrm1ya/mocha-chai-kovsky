const Queue = require('./Queue')

function hotPotato(names, num) {
  let queue = new Queue()

  for (let i = 0; i < names.length; i++) {
    queue.enqueue(names[i])
  }

  let eliminated = ''

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }

    eliminated = queue.dequeue()

    console.log(`${eliminated} was eliminated from the Hot Potato game.`)
  }

  return queue.dequeue()
}

let names = ['A', 'B', 'C', 'D', 'E']
let winner = hotPotato(names, 7)

console.log(`The winner is: ${winner}`)

