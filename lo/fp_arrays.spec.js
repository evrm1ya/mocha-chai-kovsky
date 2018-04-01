const expect = require('chai').expect;
const _ = require('lodash/fp');

const pairs = _.chunk(2);
const upperCase = _.map(x => x.toUpperCase());
const cappedPairs = _.compose(pairs, upperCase);

describe('lodash/fp arrays', () => {
  describe('chunk', () => {
    describe('pairs', () => {
      it('returns arr of items split in pairs', () => {
        expect(pairs([1, 2, 3, 4, 5, 6])).to.eql([
          [1, 2],
          [3, 4],
          [5, 6]
        ]);
      });

      it('works on odd length arrs', () => {
        expect(pairs([1, 2, 3])).to.eql([
          [1, 2],
          [3]
        ]);
      });

      it('returns empty arr if data is empty', () => {
        expect(pairs([])).to.be.empty;
      });

      it('works on strings', () => {
        expect(pairs('hello world')).to.eql([
          ['h', 'e'],
          ['l', 'l'],
          ['o', ' '],
          ['w', 'o'],
          ['r', 'l'],
          ['d']
        ]);
      });

      it('returns empty arr if string or arr not passed', () => {
        expect(pairs(20)).to.be.empty;
      });

      it('can be composed with string data', () => {
        expect(cappedPairs('hello')).to.eql([
          ['H', 'E'],
          ['L', 'L'],
          ['O']
        ]);
      });

      it('can be composed on arrs', () => {
        expect(cappedPairs([ 
          'do', 'you', 'even', 'lift', '?' 
        ]))
        .to.eql([
          ['DO', 'YOU'],
          ['EVEN', 'LIFT'],
          ['?']
        ]);
      });
    });
  });

  describe('compact', () => {
    it('removes falsey values from arr', () => {
      expect(_.compact([1, 2, null, 0, 4, "", NaN, 3]))
        .to.eql([1, 2, 4, 3]);
    });
  });

  describe('concat', () => {
    const arr = [1, 2];

    it('concats existing array to new array', () => {
      expect(_.concat([3, 4], arr))
        .to.eql([3, 4, 1, 2]);
    });

    it('has a fixed arity of two', () => {
      expect(_.concat(arr, [3, 4], [5, 6]))
        .to.eql([1, 2, 3, 4]);
    });

    it('concats nested arrs', () => {
      expect(_.concat(arr, [[3, 4], [5, 6]]))
        .to.eql([1, 2, [3, 4], [5, 6]]);
    });

    it('concats two items', () => {
      expect(_.concat('hello ', 'world'))
        .to.eql(['hello ', 'world']);
    });
  });

  describe('difference(array, [values])', () => {
    it('returns arr of items in first arg not in second arg', () => {
      expect(_.difference([1, 2, 3], [3 , 4]))
        .to.eql([1, 2]);
    });

    it('has a fixed arity of two', () => {
      expect(_.difference([1, 2, 3], [3, 4], [5]))
        .to.eql([1, 2]);
    });
  });

  describe('differenceBy(iteratee, array, [values])', () => {
    it('can use the `_.property` iteratee shorthand', () => {
      expect(_.differenceBy(
        'x',
        [{ x: 1, y: 2 }, { x: 2, y: 3 }],
        [{ x: 2, y: 3 }]
      ))
      .to.eql([{ x: 1, y: 2 }]);
    });

    it('can use the iteratee longhand', () => {
      const getX = obj => obj.x;

      expect(_.differenceBy(
        getX,
        [{ x: 1, y: 2 }, { x: 2, y: 3 }],
        [{ x: 2, y: 3 }]
      ))
      .to.eql([{ x: 1, y: 2 }]);
    });

    it('can have more complex criterion based on iteratee', () => {
      const xPlusY = obj => obj.x + obj.y;

      expect(_.differenceBy(
        xPlusY,
        [{ x: 1, y: 2 }, { x: 2, y: 3 }],
        [{ x: 1, y: 2 }]
      ))
      .to.eql([{ x: 2, y: 3 }]);
    });
  });

  describe('differenceWith(comparator, array, [values]', () => {
    it('can use a comparator to find the difference', () => {
      const lessThan2 = obj => obj.x < 2;

      expect(_.differenceWith(
        lessThan2,
        [{ x: 1, y: 2 }, { x: 2, y: 3 }],
        [{ x: 1, y: 2 }, { x: 3, y: 4 }]
      ))
      .to.eql([{ x: 2, y: 3 }]);
    });
  });

  describe('drop([n=1], array)', () => {
    it('drops first 2 elements from array', () => {
      const drop2 = _.drop(2);

      expect(drop2(['a', 'b', 'c', 'd']))
        .to.eql(['c', 'd']);
    });

    it('can be used in composition', () => {
      const arr = ["don't", "come", "closer"];
      const drop1AndFormat = _.compose(
        _.join(' '),
        upperCase,
        _.drop(1)
      );

      expect(drop1AndFormat(arr)).to.equal('COME CLOSER');
    });

    it('can be used on strings', () => {
      expect(_.join('', _.drop(2, 'shit suxx')))
        .to.equal('it suxx');
    });
  });

  describe('dropRight([n=1], array)', () => {
    it('drops from the end of array/string', () => {
      const fortuneNotInBed = _.compose(
        _.join(''),
        _.dropRight(7)
      );
      const fortune = 'You will discover your hidden talents in bed';

      expect(fortuneNotInBed(fortune))
        .to.equal('You will discover your hidden talents');
      
    });
  });

  describe('dropWhile(predicate, array)', () => {
    it('drops while predicate is true', () => {
      const alpha = 'abcdefghijklmnopqrstuvwxyz';
      const pred = letter => letter.charCodeAt(0) < 100;
      const format = _.compose(
        _.join(''),
        _.dropWhile(pred)
      );

      expect(format(alpha)).to.equal('defghijklmnopqrstuvwxyz');
    });
  });

  describe('findIndex(pred, [fromIndex=0], array)', () => {
    const rankings = [
      { rank: 1, first: 'michael', last: 'jordan' },
      { rank: 2, first: 'lebron', last: 'james' },
      { rank: 3, first: 'steph', last: 'curry' },
      { rank: 4, first: 'allen', last: 'iverson' },
      { rank: 5, first: 'kobe', last: 'bryant' }
    ];

    it('supports the `_.matches` iteratee shorthand', () => {
      expect(_.findIndex(
        { first: 'steph', last: 'curry' },
        rankings
      ))
      .to.equal(2);
    });
  });

  describe('flatten(array)', () => {
    it('flattens an array a single level deep', () => {
      expect(_.flatten([1, 2, [3], [4, 5]]))
        .to.eql([1, 2, 3, 4, 5]);
    });
  });

  describe('fromPairs(pairs)', () => {
    it('returns 3d coords', () => {
      const coords = [['x', 1], ['y', 2], ['z', 3]];
      expect(_.fromPairs(coords)).to.eql({
        x: 1,
        y: 2,
        z: 3
      });
    });
  });

  describe('head(array)', () => {
    it('returns first element in array', () => {
      expect(_.head([1, 2, 3])).to.equal(1);
    });

    it('returns undefined if array is empty', () => {
      expect(_.head([])).to.be.undefined;
    });
  });

  describe('initial(array)', () => {
    it('returns all but last element of array', () => {
      expect(_.initial([1, 2, 3, 4])).to.eql([1, 2, 3]);
    });

    it('returns empty array if passed empty array', () => {
      expect(_.initial([])).to.be.empty;
    });

    it('can turn plural to singular with composition', () => {
      const plural = ['snails', 'trails', 'nails'];
      const format = _.map(_.compose(_.join(''), _.init));

      expect(format(plural)).to.eql([
        'snail',
        'trail',
        'nail'
      ]);
    });
  });

  describe('intersection([arrays])', () => {
    it('shows where both arrs intersect', () => {
      expect(_.intersection(['a', 'b', 'c'], ['c', 'd', 'a']))
        .to.eql(['c', 'a']);
    });
  });

  describe('intersectionBy([iteratee=_.identity], [arrays])', () => {
    it('can use the `property` iteratee shorthand', () => {
      const arr1 = [
        { x: 1, y: 2 },
        { x: 4, y: 5 }
      ];

      const arr2 = [
        { x: 1, y: 3 },
        { x: 4, y: 2 },
        { x: 3, y: 5 }
      ];

      expect(_.intersectionBy('y', arr1, arr2))
        .to.eql([{ x: 1, y: 2 }, { x: 4, y: 5 }]);
    });

    it('more property iteratee', () => {
      const orders = [
        { custId: 1, orderNum: 1, prodId: 'abc' },
        { custId: 2, orderNum: 2, prodId: 'def' },
        { custId: 3, orderNum: 3, prodId: 'ghi' },
        { custId: 1, orderNum: 4, prodId: 'def' }
      ];

      const returns = [
        { custId: 1, prodId: 'abc' },
        { custId: 3, prodId: 'ghi' }
      ];

      const customersThatReturn = _.intersectionBy('custId', orders, returns);

      expect(customersThatReturn).to.eql([
        { custId: 1, orderNum: 1, prodId: 'abc' },
        { custId: 3, orderNum: 3, prodId: 'ghi' }
      ]);
    });
  });

  describe('intersectionWith([comparator], [arrays])', () => {
    const gt3 = x => x > 3;

    it('uses a comparator to filter results', () => {
      // looks like it stops on first successfull comparison
      expect(_.intersectionWith(gt3, [1, 2, 4, 6], [1, 2, 4, 5]))
        .to.eql([4]);
    });

    it('returns an empty array if no intersection', () => {
      expect(_.intersectionWith(gt3, [1, 2], [3, 4]))
        .to.eql([]);
    });
  });

  describe('last(array)', () => {
    it('returns undefined if arr is empty', () => {
      expect(_.last([])).to.be.undefined;
    });

    it('returns last char in string', () => {
      expect(_.last('10%')).to.equal('%');
    });
  });

  describe('nth([n=0], array)', () => {
    it('when n > 0, returns from left', () => {
      expect(_.nth(2, [1, 2, 3])).to.equal(3);
    });

    it('when n < 0, returns from right', () => {
      expect(_.nth(-2, [1, 2, 3])).to.equal(2);
    });
  });

  describe('reverse(array)', () => {
    it('fp does not mutate array', () => {
      const arr = [1, 2, 3];
      const rev = _.reverse(arr);

      expect(rev).to.eql([3, 2, 1]);
      expect(arr).to.eql([1, 2, 3]);

      rev[0] = 4;
      expect(arr[2]).to.equal(3);
    });
  });

  describe('slice([start=0], [end=array.length], array)', () => {
    it('start is exclusive, end exclusive', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      expect(_.slice(2)(4)(arr)).to.eql([3, 4]);
    });
  });

  describe('sortedUniq(array)', () => {
    it('returns a sorted unique values in sorted array', () => {
      expect(_.sortedUniq([2, 2, 4, 5, 5, 7, 8, 8]))
        .to.eql([2, 4, 5, 7, 8]);
    });

    it('does not sort array', () => {
      expect(_.sortedUniq([2, 2, 4, 3, 3, 8, 7, 7]))
        .to.eql([2, 4, 3, 8, 7]);
    });
  });

  describe('sortedUniqBy([iteratee], array)', () => {
    it('works with given example', () => {
      expect(_.sortedUniqBy(Math.floor, [1.1, 1.2, 2.3, 2.4]))
        .to.eql([1.1, 2.3]);
    });
  });

  describe('tail(array)', () => {
    it('returns array with all but first element', () => {
      expect(_.tail(['a', 'b', 'c'])).to.eql(['b', 'c']);
    });
  });

  describe('take([n=1], array)', () => {
    it('returns array of first n elements', () => {
      expect(_.take(3, [1, 2, 3, 4, 5])).to.eql([1, 2, 3]);
    });
  });

  describe('takeRight([n=1], array)', () => {
    it('returns array of last n elements', () => {
      expect(_.takeRight(3, [1, 2, 3, 4, 5])).to.eql([3, 4, 5]);
    });
  });

  describe('takeRightWhile([predicate=_.identity], array)', () => {
    it('takes from end while predicate is true', () => {
      const lt4 = x => x < 4;

      expect(_.takeRightWhile(lt4, [1, 2, 3, 4, 2, 3, 1]))
        .to.eql([2, 3, 1]);
    });

    it('can use the _.matchesProperty shorthand', () => {
      const genres = [
        { name: 'polka', dead: false },
        { name: 'punk', dead: true },
        { name: 'rock', dead: true }
      ];

      const deadGenres = _.compose(
        _.map(_.property('name')),
        _.takeRightWhile(['dead', true])
      );

      expect(deadGenres(genres))
        .to.eql(['punk', 'rock']);
    });
  });

  describe('takeWhile([predicate=_.identity], array)', () => {
    it('takes from the left while predicate is true', () => {
      // firstCharLtLetter :: String -> String -> Bool
      const firstCharLtLetter = _.curry((letter, string) => 
        _.head(string) < letter);

      const ltE = firstCharLtLetter('e');

      expect(_.takeWhile(ltE, ['apple', 'bacon', 'crepe', 'dragonfruit', 'eclair', 'donut']))
        .to.eql(['apple', 'bacon', 'crepe', 'dragonfruit']);
    });
  });

  describe('union([arrays])', () => {
    it('creates an array of unique values from multiple arrays', () => {
      expect(_.union(['a', 'B', 'c'], ['c', 'a', 'D']))
        .to.eql(['c', 'a', 'D', 'B']);

    });

    it('starts with last array passed', () => {
      expect(_.union([3, 4, 2, 1], [2, 4, 6, 7]))
        .to.eql([2, 4, 6, 7, 3, 1]);
    });
  });

  describe('unionBy([iteratee=_.indentity], [arrays])', () => {
    it('can use the property iteratee shorthand', () => {
      const generic1 = [
        { a: 1, b: 2 },
        { a: 3, b: 4 }
      ];

      const generic2 = [
        { a: 5, b: 3 },
        { a: 3, b: 2 }
      ];

      expect(_.unionBy('b', generic1, generic2)).to.eql([
        { a: 1, b: 2 },
        { a: 3, b: 4 },
        { a: 5, b: 3 }
      ]);
    });
  });

  describe('uniqBy([iteratee=_.indentity], [arrays])', () => {
    const beeth5 = [
      { pitch: 'r', rythm: 'e' },
      { pitch: 7, rythm: 'e' },
      { pitch: 7, rythm: 'e' },
      { pitch: 7, rythm: 'e' },
      { pitch: 4, rythm: 'h' }
    ];

    const pitchSet = _.compose(
      _.map(_.property('pitch')),
      _.filter(note => note.pitch !== 'r'),
      _.uniqBy('pitch')
    );

    it('could be useful for set notation (music)', () => {
      expect(pitchSet(beeth5)).to.eql([7, 4]);
    });
  });
});






