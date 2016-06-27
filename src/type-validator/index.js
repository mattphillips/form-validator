export default class Type {
  static validate = curriedType => curriedType.valid === undefined ? ValidType(curriedType, []) : curriedType;
}

// TODO: maybe invalidFields should be an object of field name -> invalidField instead of [invalidField]
const ValidType = (value, validFields) => {
  const map = (curriedType, fieldValue, validFields) => ValidType(curriedType(fieldValue), validFields);
  return {
    value,
    validFields,
    valid: true,
    map,
    ap: fieldResult => {
      if (fieldResult.valid) {
        return map(value, fieldResult.value, validFields.concat(fieldResult));
      } else {
        return InvalidType(value(fieldResult.value), validFields, [fieldResult]);
      }
    },
  }
}

const InvalidType = (value, validFields, invalidFields) => {
  const map = (curriedType, fieldValue, validFields, invalidFields) =>
    InvalidType(curriedType(fieldValue), validFields, invalidFields);
  return {
    value,
    validFields,
    invalidFields,
    valid: false,
    map,
    ap: fieldResult => {
      if (fieldResult.valid) {
        return map(value, fieldResult.value, validFields, invalidFields);
      } else {
        return map(value, fieldResult.value, validFields, invalidFields.concat(fieldResult));
      }
    }
  }
}
