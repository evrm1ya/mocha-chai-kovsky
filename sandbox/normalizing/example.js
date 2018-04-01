const {
  normalize,
  schema
} = require('normalizr')

const data = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}

const user = new schema.Entity('users')

const comment = new schema.Entity('comments', {
  commenter: user
})

const article = new schema.Entity('articles', {
  author: user,
  comments: [ comment ]
})

const normalizedData = normalize(data, article)

console.log(JSON.stringify(normalizedData, null, 2))

