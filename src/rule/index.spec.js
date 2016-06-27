import rule from './index';
import { expect } from 'chai';

describe('Test rule logic', () => {
  const notEmptyRule = rule(a => a.length > 0, 'Error field should not be empty');

  it('should return valid object when predicate is true', () => {
    const value = 'Hello, world!';
    const actual = notEmptyRule(value);
    expect(actual.valid).to.equal(true);
    expect(actual.value).to.equal(value);
  });

  it('should return invalid object when predicate is false', () => {
    const value = '';
    const actual = notEmptyRule(value);
    expect(actual.valid).to.equal(false);
    expect(actual.value).to.equal(value);
    expect(actual.errors).to.deep.equal(['Error field should not be empty']);
  });
});
