import Field from './index';
import rule from '../rule';
import { expect } from 'chai';

describe('Test field result logic', () => {

  const fieldName = 'hello';

  const notEmptyError = 'Error field should not be empty';
  const notEmptyRule = rule(a => a.length > 0, notEmptyError);

  const maxLengthError = 'Error field should not greater than 10 characters long';
  const maxLengthRule = rule(a => a.length < 10, maxLengthError);

  const lowerCaseError = 'Error field should not contain uppercase characters';
  const lowerCaseRule = rule(a => a.match(/[a-z]/), lowerCaseError);

  const numberError = 'Error field should contain a number';
  const numberRule = rule(a => a.match(/\d/), numberError);

  it('should return valid object when value passes one rule', () => {
    const value = 'Hello, World!';
    const actual = Field.validate(value, fieldName).ap(notEmptyRule);

    expect(actual.valid).to.equal(true);
    expect(actual.value).to.equal(value);
    expect(actual.name).to.equal(fieldName);
  });

  it('should return valid object when value passes multiple rules', () => {
    const value = 'Hello!';
    const actual = Field.validate(value, fieldName).ap(notEmptyRule).ap(maxLengthRule);

    expect(actual.valid).to.equal(true);
    expect(actual.value).to.equal(value);
    expect(actual.name).to.equal(fieldName);
  });

  it('should return invalid object when value fails one rule', () => {
    const value = '';
    const actual = Field.validate(value, fieldName).ap(notEmptyRule);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.equal(value);
    expect(actual.errors).to.deep.equal([notEmptyError]);
    expect(actual.name).to.equal(fieldName);
  });

  it('should return invalid object when value fails multiple rules', () => {
    const value = 'HELLO, WORLD!';
    const actual = Field.validate(value, fieldName).ap(maxLengthRule).ap(lowerCaseRule);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.equal(value);
    expect(actual.errors).to.deep.equal([maxLengthError, lowerCaseError]);
    expect(actual.name).to.equal(fieldName);
  });

  it('should return invalid object when value passes a rule and fails another rule', () => {
    const value = 'HELLO, WORLD!';
    const actual = Field.validate(value, fieldName).ap(notEmptyRule).ap(lowerCaseRule);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.equal(value);
    expect(actual.errors).to.deep.equal([lowerCaseError]);
    expect(actual.name).to.equal(fieldName);
  });

  it('should return invalid object when value passes multiple rules and fails multiple rules', () => {
    const value = 'HELLO, WORLD!123';
    const actual = Field.validate(value, fieldName).ap(notEmptyRule).ap(maxLengthRule).ap(lowerCaseRule).ap(numberRule);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.equal(value);
    expect(actual.errors).to.deep.equal([maxLengthError, lowerCaseError]);
    expect(actual.name).to.equal(fieldName);
  });
});
