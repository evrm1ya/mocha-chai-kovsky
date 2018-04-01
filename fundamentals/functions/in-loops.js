const funcs = []

for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log(`i value is ${i}`)
  }
}

// retains last state of i
funcs.forEach(func => func())

const funcs2 = []

// pass i into scope
for (var i = 0; i < 3; i++) {
  funcs2[i] = (function(i) {
    return function f() {
      console.log(`i value is ${i}`)
    }
  })(i)
}

funcs2.forEach(func => func())

const funcs3 = []

// use let
for (let i = 0; i < 3; i++) {
  funcs3[i] = function() {
    console.log(`i value is ${i}`)
  }
}

funcs3.forEach(func => func())

