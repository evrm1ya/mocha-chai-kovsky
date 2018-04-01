// a -----> s <----------> t <------- b
// a => apple tree
// b => orange tree
// s => edge of house
// t => edge of house
// d => distance fruit falls from tree
//      negative => fruit fell to left of tree
//      positive => fruit fell to right
// m => number of apples
// n => number of oranges
// 1 <= s, t, a, b, m, n <= 10^5
// a < s < t < b
//
// data:
// s t
// a b
// m n
// m space-separated apple d from point a
// n space-separated orange d from point b

// print how many apples fall on the house
// print how many oranges fall on the house

// example
// 7 11
// 5 15
// 3 2
// -2 2 1
// 5 -6

// 5 --> 7 ----> 11 ----> 15
// 1 apple fell on the house where d = 2
// 1 orange fell on the house where d = -6

function isInRange(s, t, treePoint) {
  return function f(fruit) {
    const point = treePoint + fruit

    return point >= s && point <= t
  }
}

function solution(s, t, a, b, apples, oranges) {
  console.log(apples.filter(isInRange(s, t, a)).length)
  console.log(oranges.filter(isInRange(s, t, b)).length)
}

solution(7, 11, 5, 15, [-2, 2, 1], [5, -6])

