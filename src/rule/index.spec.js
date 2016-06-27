import rule from './index';
import { expect } from 'chai';

describe('Test rule logic', () => {
  const notEmptyRule = rule(a => a.length > 0, 'Error field should not be empty');

  it('should return valid object when predicate is true', () => {
    const value = 'Hello, world!';
    expect(notEmptyRule(value).valid).to.equal(true);
    expect(notEmptyRule(value).value).to.equal(value);
  });

  it('should return invalid object when predicate is false', () => {
    const value = '';
    expect(notEmptyRule(value).valid).to.equal(false);
    expect(notEmptyRule(value).value).to.equal(value);
    expect(notEmptyRule(value).errors).to.deep.equal(['Error field should not be empty']);
  });
});
