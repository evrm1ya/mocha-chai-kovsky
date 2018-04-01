const expect = require('chai').expect;
const chp3 = require('../src/03-few-data-structures-many-ops');
const _ = require('lodash');
const R = require('ramda');

const people = require('./people');
const p1 = people.p1;
const p2 = people.p2;
const p3 = people.p3;
const p4 = people.p4;
const people1 = people.people1;
const tree = people.tree;

// name does not point to a concrete value
// lazily to a description of how to obtain it
const name = p => p.fullname;

const name2 = s =>
  (s !== null && s !== undefined)
    ? s.fullname
    : '';

describe('ch03', () => {
  describe('lambda expressions', () => {
    it('can be used to return name of person', () => {
      expect(name(p1)).to.equal('Haskell Curry');
    });
  });

  describe('transforming data with _.map', () => {
    it('can iterate over people to return all names', () => {
      // map(f, [e0, e1, e2...]) -> [r0, r1, r2...]; where, f(dn) = rn
      expect(_.map(people1, name2)).to.eql([
        'Haskell Curry',
        'Barkley Rosser',
        'John von Neumann',
        'Alonzo Church'
      ]);
    });

    describe('map implementation', () => {
      it('works like _.map', () => {
        expect(chp3.myMap(people1, name2)).to.eql([
          'Haskell Curry',
          'Barkley Rosser',
          'John von Neumann',
          'Alonzo Church'
        ]);
      });
    });

    it('reverse chain does not mutate original arr', () => {
      // lodash reverse mutates the original array
      const newArr = R.compose(
        R.map(name2),
        R.reverse
      )(people1);

      expect(newArr).to.eql([
        'Alonzo Church',
        'John von Neumann',
        'Barkley Rosser',
        'Haskell Curry'
      ]);

      expect(people1).to.eql([p1, p2, p3, p4]);
    });
  });

  describe('gathering results with _.reduce', () => {
    describe('myReduce', () => {
      it('sums up some numbers', () => {
        const sum = chp3.myReduce(
          [1, 2, 3],
          (x, y) => x + y,
          0
        );

        expect(sum).to.equal(6);
      });
    });

    describe('_.reduce', () => {
      it('reduces people objects to a population object', () => {
        const reducer = (stat, person) => {
          const country = person.address.country;
          stat[country] = _.isUndefined(stat[country])
            ? 1
            : stat[country] + 1;

          return stat;
        };

        const populationByCountry = _(people1).reduce(reducer, {});

        expect(populationByCountry).to.eql({
          'US': 2,
          'Greece': 1,
          'Hungary': 1
        });
      });

      it('can be combined with _.map', () => {
        const population = _(people1)
          .map(chp3.getCountry)
          .reduce(chp3.gatherStats, {});

        expect(population).to.eql({
          'US': 2,
          'Greece': 1,
          'Hungary': 1
        });
      });

      it('can use R.lens to access props', () => {
        const cityPopulation = _(people1)
          .map(R.view(chp3.cityLens))
          .reduce(chp3.gatherStats, {});

        expect(cityPopulation).to.eql({
          'Wichita': 1,
          'Athens': 1,
          'Budapest': 1,
          'Tulsa': 1
        });
      });
    });
  });

  describe('_.countBy', () => {
    it('can be used to count city population', () => {
      const cityPopulation = _.countBy(people1, R.view(chp3.cityLens));

      expect(cityPopulation).to.eql({
        'Wichita': 1,
        'Athens': 1,
        'Budapest': 1,
        'Tulsa': 1
      });
    });
  });

  describe('validation functions', () => {
    describe('isNotValid', () => {
      it('returns true if value is null', () => {
        expect(chp3.isNotValid(null)).to.be.true;
      });

      it('returns true if value is undefined', () => {
        expect(chp3.isNotValid(undefined)).to.be.true;
      });

      it('returns false if value is not null or undefined', () => {
        expect(chp3.isNotValid(1)).to.be.false;
      });
    });

    describe('notAllValid', () => {
      it('returns true if some values are invalid', () => {
        const args = ['string', 0, null, undefined];
        expect(chp3.notAllValid(args)).to.be.true;
      });

      it('returns false if all values are valid', () => {
        const args = ['string', 0, {}];
        expect(chp3.notAllValid(args)).to.be.false;
      });
    });

    describe('isValid', () => {
      it('returns the opposite of isNotValid with null arg', () => {
        expect(chp3.isValid(null)).to.be.false;
      });

      it('returns the opposite of isNotValid with undefined arg', () => {
        expect(chp3.isValid(undefined)).to.be.false;
      });

      it('returns true when passed a valid argument', () => {
        expect(chp3.isValid(1)).to.be.true;
      });
    });

    describe('allValid', () => {
      it('returns false if some values are invalid', () => {
        const args = ['string', 0, null, undefined];
        expect(chp3.allValid(args)).to.be.false;
      });

      it('returns true if all values are valid', () => {
        const args = ['string', 0, {}];
        expect(chp3.allValid(args)).to.be.true;
      });
    });
  });

  describe('filtering', () => {
    describe('myFilter', () => {
      it('filters on people born in 1903', () => {
        const filtered = chp3.myFilter(people1, chp3.bornIn1903).map(name);
        expect(filtered).to.eql(['John von Neumann', 'Alonzo Church']);
      });
    });

    describe('_.filter', () => {
      it('filters on people born in 1903', () => {
        const filtered = _(people)
          .filter(chp3.bornIn1903)
          .map(name)
          .join(' and ');

        expect(filtered).to.equal('John von Neumann and Alonzo Church');
      });
    });
  });

  describe('imperative vs declarative', () => {
    const names = ['alonzo church', 'haskell curry', 'stephen_kleene',
      'John Von Neumann', 'stephen_kleene'];

    describe('imperative', () => {
      it('is lengthy', () => {
        var result = [];

        for (let i = 0; i < names.length; i++) {
          var n = names[i];

          if (n !== undefined && n !== null) {
            var ns = n.replace(/_/, ' ').split(' ');

            for (let j = 0; j < ns.length; j++) {
              var p = ns[j];
              p = p.charAt(0).toUpperCase() + p.slice(1);
              ns[j] = p;
            }

            if (result.indexOf(ns.join(' ')) < 0) {
              result.push(ns.join(' '));
            }
          }
        }

        result.sort();

        expect(result).to.eql([
          'Alonzo Church',
          'Haskell Curry',
          'John Von Neumann',
          'Stephen Kleene'
        ]);
      });
    });

    describe('declarative', () => {
      it('is easier to read', () => {
        const result = _.chain(names)
          .filter(chp3.isValid)
          .map(s => s.replace(/_/, ' '))
          .uniq()
          .map(_.startCase)
          .sort()
          .value();

        expect(result).to.eql([
          'Alonzo Church',
          'Haskell Curry',
          'John Von Neumann',
          'Stephen Kleene'
        ]);
      });
    });
  });

  describe('_.mixin', () => {
    it('looks like sql', () => {
      _.mixin({
        'select': _.pluck,
        'from': _.chain,
        'where': _.filter,
        'groupBy': _.sortByOrder
      });

      const result = _.from(people1)
        .where(p => p.birthYear > 1900 && p.address.country !== 'US')
        .groupBy(['firstname', 'birthYeaer'])
        .select('firstname', 'birthYear')
        .value();

      expect(result).to.eql([ 'Alan', 'Barkley', 'John' ]);
    });
  });
});

