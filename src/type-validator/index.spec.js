import Type from './index';
import rule from '../rule';
import Field from '../field-validator';

import { expect } from 'chai';

describe('Test type validation logic', () => {

  const userType = name => age => { return { name, age }; };

  const nameFieldName = 'name';
  const ageFieldName = 'age';

  const notEmptyRule = rule(name => name.length > 0, 'Error name should not be empty');
  const eighteenAndGreaterRule = rule(age => age > 17, 'Error age must be 18 and over');

  it('should return valid type when all fields are valid', () => {
    const name = 'Matt';
    const nameResult = Field.validate(name, nameFieldName).ap(notEmptyRule);

    const age = 18;
    const ageResult = Field.validate(age, ageFieldName).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(true);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.fieldResults).to.deep.equal({ [nameFieldName]: nameResult, [ageFieldName]: ageResult });
    expect(actual.validFields()).to.deep.equal({ [nameFieldName]: nameResult, [ageFieldName]: ageResult });
  });

  it('should return invalid type when name field is invalid', () => {
    const name = '';
    const nameResult = Field.validate(name, nameFieldName).ap(notEmptyRule);

    const age = 18;
    const ageResult = Field.validate(age, ageFieldName).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.fieldResults).to.deep.equal({ [nameFieldName]: nameResult, [ageFieldName]: ageResult });
    expect(actual.validFields()).to.deep.equal({ [ageFieldName]: ageResult });
    expect(actual.invalidFields()).to.deep.equal({ [nameFieldName]: nameResult });
  });

  it('should return invalid type when age field is invalid', () => {
    const name = 'Matt';
    const nameResult = Field.validate(name, nameFieldName).ap(notEmptyRule);

    const age = 17;
    const ageResult = Field.validate(age, ageFieldName).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.fieldResults).to.deep.equal({ [nameFieldName]: nameResult, [ageFieldName]: ageResult });
    expect(actual.validFields()).to.deep.equal({ [nameFieldName]: nameResult });
    expect(actual.invalidFields()).to.deep.equal({ [ageFieldName]: ageResult });
  });

  it('should return invalid type when all fields are invalid', () => {
    const name = '';
    const nameResult = Field.validate(name, nameFieldName).ap(notEmptyRule);

    const age = 17;
    const ageResult = Field.validate(age, ageFieldName).ap(eighteenAndGreaterRule);

    const actual = Type.validate(userType).ap(nameResult).ap(ageResult);

    expect(actual.valid).to.equal(false);
    expect(actual.value).to.deep.equal({ name: name, age: age });
    expect(actual.fieldResults).to.deep.equal({ [nameFieldName]: nameResult, [ageFieldName]: ageResult });
    expect(actual.validFields()).to.deep.equal({});
    expect(actual.invalidFields()).to.deep.equal({ [ageFieldName]: ageResult, [nameFieldName]: nameResult });
  });
});
