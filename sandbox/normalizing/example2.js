const { normalize, schema } = require('normalizr')

const blogPosts = [
  {
      id : "post1",
      author : {username : "user1", name : "User 1"},
      body : "......",
      comments : [
          {
              id : "comment1",
              author : {username : "user2", name : "User 2"},
              comment : ".....",
          },
          {
              id : "comment2",
              author : {username : "user3", name : "User 3"},
              comment : ".....",
          }
      ]    
  },
  {
      id : "post2",
      author : {username : "user2", name : "User 2"},
      body : "......",
      comments : [
          {
              id : "comment3",
              author : {username : "user3", name : "User 3"},
              comment : ".....",
          },
          {
              id : "comment4",
              author : {username : "user1", name : "User 1"},
              comment : ".....",
          },
          {
              id : "comment5",
              author : {username : "user3", name : "User 3"},
              comment : ".....",
          }
      ]    
  }
  // and repeat many times
]

const user = new schema.Entity('users', {}, {
  idAttribute: 'username'
})

const comment = new schema.Entity('comments', {
  author: user
})

const post = new schema.Entity('posts', {
  author: user,
  comments: [ comment ]
})

const normalizedData = normalize(blogPosts, [post])

console.log(JSON.stringify(normalizedData, null, 2))
