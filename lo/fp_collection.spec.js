const expect = require('chai').expect;
const _ = require('lodash/fp');
const people = require('./data');

describe('collection methods', () => {
  describe('countBy([iteratee=_.identity], collection)', () => {
    it('counts items in array', () => {
      expect(_.countBy(x => x, ['a', 'b', 'a', 'a', 'b', 'c', 'd']))
        .to.eql({ a: 3, b: 2, c: 1, d: 1 });
    });

    it('can use the _.property iteratee shorthand', () => {
      const medals = [
        { color: 'gold', rank: 1 },
        { color: 'silver', rank: 2 },
        { color: 'bronze', rank: 3 },
        { color: 'silver', rank: 2 },
        { color: 'bronze', rank: 3 },
        { color: 'silver', rank: 2 },
        { color: 'silver', rank: 2 }
      ];

      expect(_.countBy('color', medals))
        .to.eql({ gold: 1, silver: 4, bronze: 2 });
    });
  });

  describe('every([predicate=_.identity], collection)', () => {
    const passing = result => result.grade > 1;
    const everyonePassed = _.every(passing);

    it('returns true if every item meets predicate criteria', () => {
      const grades = [
        { id: 1, grade: 4 },
        { id: 2, grade: 2 },
        { id: 3, grade: 3 }
      ];

      expect(everyonePassed(grades)).to.be.true;
    });

    it('returns false if an item does not meet criteria', () => {
      const grades = [
        { id: 1, grade: 4 },
        { id: 2, grade: 2 },
        { id: 3, grade: 1 }
      ];

      expect(everyonePassed(grades)).to.be.false;
    });
  });

  describe('find([predicate=_.identity], collection)', () => {
    it('finds the first person with a balance greater than $2,000', () => {
      const balanceGt2000 = _.compose(
        balance => balance > 2000,
        parseFloat,
        _.replace(/[\$\,]/g, ''),
        _.property('balance')
      );

      expect(_.find(balanceGt2000, people).name).to.equal('Bolton Park')
    });

    it('supports _.matchesProperty iteratee', () => {
      expect(_.find(['eyeColor', 'green'], people).name).to.equal('John Riddle');
    });
  });
});

