// Haskell notation
// <function-name> :: <Inputs*> -> <Output>
// isEmpty :: String -> Boolean
export const isEmpty = s => !s || !s.trim();

// function pipelines
//
// Type A ---> f::A->B ---> Type B ---> g::B->C ---> Type C
// connecting functions must be compatible in terms of
// arity and type

// Requirements for compatible functions
//
// Type - type returned by one function must match 
// the argument type of a receiving function
//
// Arity - a receiving function must declare at least
// one parameter in order to handle the value returned 
// from a preceding function call
//

// two functions f and g are type-compatible if the output
// of f has a type equivalent to the set of inputs of g

// trim :: String -> String
export const trim = str => str.replace(/^\s*|\s*$/g, '');

// normalize :: String -> String
export const normalize = str => str.replace(/\-/g, '');

// the case for tuples
// may want to return a group of finite values
// benefits:
// immutable
// avoids creating ad hoc types
// avoids creating heterogenous arrays

const Tuple = function() {
}

