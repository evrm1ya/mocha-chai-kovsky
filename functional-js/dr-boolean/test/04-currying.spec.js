import test from 'tape';
import {
  replaceHyphens,
  replaceEncodedColons,
  words,
  sentences,
  filterQs,
  max,
  slice,
  take
} from '../04-currying';

test('replaceHyphens', test => {
  const replaceHyphensWithEmptyString = replaceHyphens('');

  test.equal(
    replaceHyphensWithEmptyString('2017-01-02'),
    '20170102'
  );

  test.end();
});

test('replaceEncodedColons', test => {
  test.equal(
    replaceEncodedColons('01%3A01%3A01'),
    '01:01:01'
  );

  test.end();
});

test('exercise1 - words', test => {
  const sentence = 'foo bar baz';

  test.deepEqual(
    words(sentence),
    ['foo', 'bar', 'baz']
  );

  test.end();
});

test('exercise1a - sentences', test => {
  const sentencesArray = [
    'Jingle bells Batman smells',
    'Robin laid an egg'
  ];

  test.deepEqual(
    sentences(sentencesArray),
    [
      ['Jingle', 'bells', 'Batman', 'smells'],
      ['Robin', 'laid', 'an', 'egg']
    ]
  );

  test.end();
});

test('exercise2 - filterQs', test => {
  const strings = ['quick', 'camels', 'quarry', 'over', 'quails'];

  test.deepEqual(
    filterQs(strings),
    ['quick', 'quarry', 'quails']
  );

  test.end();
});

test('exercise3 - max', test => {
  const numbers = [10, 2, 100, 99, 1001, -1, 80];

  test.deepEqual(max(numbers), 1001);

  test.end();
});

test('slice', test => {
  test.deepEqual(slice(1)(3)(['a', 'b', 'c']), ['b', 'c']);

  test.end();
});

test('take', test => {
  const arr = [1, 2, 3, 4, 5, 6];

  test.deepEqual(take(3, arr), [1, 2, 3]);

  test.end();
});

