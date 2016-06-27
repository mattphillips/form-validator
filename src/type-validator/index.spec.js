import Type from './index';
import rule from '../rule';
import Field from '../field-validator';

import { expect } from 'chai';

describe('Test type validation logic', () => {

  const userType = name => age => { return { name, age }; };

  const notEmptyRule = rule(name => name.length > 0, 'Error name should not be empty');
  const eighteenAndGreaterRule = rule(age => age > 17, 'Error age must be 18 and over');

  it('should return valid type when all fields are valid', () => {
    const name = 'Matt';
    const nameResult = Field.validate(name).ap(notEmptyRule);

    const age = 18;
    const ageResult = Field.validate(age).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(true);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.validFields).to.deep.equal([nameResult, ageResult]);
  });

  it('should return invalid type when age field is invalid', () => {
    const name = 'Matt';
    const nameResult = Field.validate(name).ap(notEmptyRule);

    const age = 17
    const ageResult = Field.validate(age).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.validFields).to.deep.equal([nameResult]);
    expect(actual.invalidFields).to.deep.equal([ageResult]);
  });

  it('should return invalid type when all fields are invalid', () => {
    const name = '';
    const nameResult = Field.validate(name).ap(notEmptyRule);

    const age = 17
    const ageResult = Field.validate(age).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.validFields).to.deep.equal([]);
    expect(actual.invalidFields).to.deep.equal([nameResult, ageResult]);
  });
});
