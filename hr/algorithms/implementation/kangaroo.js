// x1 => kangaroo one starting position
// v1 => k1 meters per jump
// x2 => kangaroo two starting position
// v2 => k2 meters per jump
// will they ever land at the same location
// at the same time?
//
// input
// x1 v1 x2 v2
//
// print YES if they land on same location
// at same time
// print NO if otherwise
//
// constraints
// 0 <= x1 < x2 <= 10000
// 1 <= v1 <= 10000
// 1 <= v2 <= 10000
//
// the two kangaroos must land at the same
// location after making the same number of
// jumps
//
// sample:
// 0 3 4 2
//
//  0--1--2--3--4--5--6--7--8--9--10-11-12--
//  x1          x2 
//           x1a      x1b      x1c      x1d 
//                    x2a   x2b   x2c   x2d 
//
// both kangaroos met on 4th jump
// output: YES
//
// if v2 >= v1
// always NO

const input1 = '0 3 4 2'
const input2 = '0 2 5 3'
const input3 = '0 3 10 2'

const solution = input => {
  const [x1, v1, x2, v2] = input.split(' ').map(Number)
  var currentK1Pos = x1
  var currentK2Pos = x2
  var result = 'NO'

  if (v2 >= v1) {
    return result
  }

  while (currentK1Pos < currentK2Pos) {
    currentK1Pos = currentK1Pos + v1;
    currentK2Pos = currentK2Pos + v2;

    if (currentK1Pos > currentK2Pos) {
      break
    }

    if (currentK1Pos === currentK2Pos) {
      result = 'YES'
      break
    }
  }

  return result
}

console.log(solution(input1))
console.log(solution(input2))
console.log(solution(input3))

