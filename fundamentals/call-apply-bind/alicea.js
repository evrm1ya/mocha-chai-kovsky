// From JS: Understanding the Weird Parts

const person = {
  firstname: 'Dave',
  lastname: 'Chappelle',
  getFullName: function() {
    return `${this.firstname} ${this.lastname}`
  }
}

const logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName())
  console.log(`Arguments: ${lang1} ${lang2}`)
  console.log('-----------')
}

const logPersonName = logName.bind(person)

logPersonName()
logPersonName('en')
logPersonName('en', 'fr')

// call()
// call executes the function whereas bind creates a copy
logName.call(person)
logName.call(person, 'en', 'fr')

// apply()
logName.apply(person, ['en'])
logName.apply(person, ['en', 'fr'])

// function borrowing
const person2 = {
  firstname: 'Louis',
  lastname: 'C.K'
}

console.log(person.getFullName.apply(person2, ['en', 'es']))

