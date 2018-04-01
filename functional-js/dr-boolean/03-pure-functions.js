// Pure Function
// given the same input, will always return the same
// output and does not have any observable side effect

// Side Effect
// a change of system state or observable interaction
// with the outside world that occurs during the calculation
// of a result
//
// functions that cause side effects should be contained
// and ran in a controlled way

const Immutable = require('immutable');

// referential transparency example
export const decrementHP = player => player.set('hp', player.get('hp') - 1);

export const isSameTeam = (player1, player2) =>
  player1.get('team') === player2.get('team');

export const punch = (player, target) =>
  isSameTeam(player, target) ? target : decrementHP(target);

// equational reasoning
// inline isSameTeam
// const punch = (player, target) =>
//   player.get('team') === target.get('team') ? target : decrementHP(target);

// data is immutable so replace teams with value
// const punch = (player, target) =>
//   'red' === 'green' ? target : decrementHP(target);

// 'red' !== 'green' so remove ternary
// const punch = (player, target) => decrementHP(target);

// inline decrementHP
// const punch = (player, target) => target.set('hp', target.get('hp') - 1);
