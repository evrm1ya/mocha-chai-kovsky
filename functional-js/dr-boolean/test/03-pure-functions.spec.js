import test from 'tape';
import { Map } from 'immutable';
import {
  decrementHP,
  isSameTeam,
  punch
} from '../03-pure-functions';

test('Chapter3 - Pure Functions', test => {
  const player1 = Map({
    name: 'Jobe',
    hp: 20,
    intelligence: 10,
    team: 'red'
  });

  const player2 = Map({
    name: 'Michael',
    hp: 20,
    intelligence: 10,
    team: 'green'
  });

  const player3 = Map({
    name: 'Bruce Wayne',
    hp: 100,
    intelligence: 100,
    team: 'red'
  });

  test.ok(
    isSameTeam(player1, player3),
    'isSameTeam returns true if players are on same team'
  );

  test.notOk(
    isSameTeam(player1, player2),
    'isSameTeam returns false if players are on different teams'
  );

  test.equal(
    decrementHP(player1).get('hp'),
    19,
    'decrementHP decreases player hp by 1'
  );

  test.equal(
    punch(player1, player2).get('hp'),
    19,
    'punch decreases player hp by 1 if not on same team'
  );

  test.equal(
    punch(player1, player3).get('hp'),
    100,
    'punch does not decrease player hp if players on same team'
  );

  test.end();
});

