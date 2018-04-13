// lx.ly.y x
// ly.y[x:=x]
// ly.y
const first = (y => y);
const second = (x => first(x));

console.log(second(first));

// lx.ly.x
const True = (x => y => x);

// lx.ly.y
const False = (x => y => y);

console.log(True(true)(false));
console.log(False(true)(false));

// lx.ly.lz.x y z
const If = (x => y => z => x(y)(z));

console.log(If(True)('True')('oops'));
console.log(If(False)('oops')('False'));

// Numbers
const calculate = f => f(x => x + 1)(0);

// 2nd argument is 0
const zero = f => x => x;

const one = f => x => f(x);
const two = f => x => f(f(x));
const three = f => x => f(f(f(x)));

console.log(calculate(two));

const Omega = x => x(x);
//console.log(Omega(Omega));

// lf.(lx.f(xx))(lx.f(xx))
const Y = f => (x => x(x))(x => f(y => x(x)(y)));

const fib = f => n =>
  n <= 1
    ? n
    : f(n - 1) + f(n - 2);

const yFib = Y(fib);
console.log(yFib(10));
