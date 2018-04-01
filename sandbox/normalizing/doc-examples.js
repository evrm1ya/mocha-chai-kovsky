// run with --harmony
const { normalize, schema } = require('normalizr')

const data = {
  id_str: '123',
  url: 'https://twitter.com',
  user: {
    id_str: '456',
    name: 'Jimmy'
  }
}

const user = new schema.Entity('users', {}, {
  idAttribute: 'id_str'
})

const tweet = new schema.Entity('tweets', { user: user }, {
  idAttribute: 'id_str',
  mergeStrategy: (entityA, entityB) => ({
    ...entityA,
    ...entityB,
    favorites: entityA.favorites
  })
})

const normalizedData = normalize(data, tweet)

console.log(JSON.stringify(normalizedData, null, 2))

const { users, tweets } = normalizedData.entities

for (let k in tweets) {
  console.log(users[tweets[k].user])
}

