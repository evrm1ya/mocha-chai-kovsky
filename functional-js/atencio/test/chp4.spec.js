import { expect } from 'chai';
import {
  isEmpty,
  trim,
  normalize
} from '../src/04-toward-modular-reusable-code';

describe('chapter4', () => {
  describe('isEmpty', () => {
    it('returns true if string is empty', () => {
      expect(isEmpty('')).to.be.true;
    });

    it('returns true for blank strings', () => {
      expect(isEmpty('  ')).to.be.true;
    });

    it('returns false for non empty strings', () => {
      expect(isEmpty('test')).to.be.false;
    });
  });

  describe('simple pipeline', () => {
    it('trims ssn and removes hyphens', () => {
      const result = normalize(trim('444-44-4444 '));

      expect(result).to.equal('444444444');
    });
  });
});

