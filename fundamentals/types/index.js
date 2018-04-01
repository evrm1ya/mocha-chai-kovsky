const obj = {}
const arr = []
const str = 'abc'
const num = 1
const fn = x => x
const n = null
const u = undefined
const t = true
const f = false
let a

console.log('typeof {} :', typeof obj)
console.log('typeof [] :', typeof arr)
console.log('typeof "abc" : ', typeof str)
console.log('typeof 1 : ', typeof num)
console.log('typeof x => x : ', typeof fn)
console.log('typeof null : ', typeof n)
console.log('typeof undefined : ', typeof u)
console.log('typeof true : ', typeof t)
console.log('typeof false : ', typeof f)

console.log('\n')

console.log('{} isArray : ', Array.isArray(obj))
console.log('[] isArray : ', Array.isArray(arr))

console.log('\n')

console.log('toString {} : ', toString.call(obj))
console.log('toString [] : ', toString.call(arr))
console.log('toString "abc" : ', toString.call(str))
console.log('toString 1 : ', toString.call(num))
console.log('toString x => x : ', toString.call(fn))
console.log('toString null : ', toString.call(n))
console.log('toString undefined : ', toString.call(u))
console.log('toString true : ', toString.call(t))
console.log('toString false : ', toString.call(f))

