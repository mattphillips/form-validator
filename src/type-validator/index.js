export default class Type {
  static validate = curriedType => ValidType(curriedType, {});
}

const ValidType = (value, fieldResults) => {
  const map = (curriedType, fieldValue, fieldResults) => ValidType(curriedType(fieldValue), fieldResults);
  return {
    value,
    fieldResults,
    valid: true,
    map,
    ap: fieldResult => {
      if (fieldResult.valid) {
        return map(value, fieldResult.value, { ...fieldResults, [fieldResult.name]: fieldResult });
      } else {
        return InvalidType(value(fieldResult.value), { ...fieldResults, [fieldResult.name]: fieldResult });
      }
    },
    validFields: () => filterFieldResults(validPredicate, fieldResults),
    invalidFields: () => filterFieldResults(invalidPredicate, fieldResults),
  }
}

const InvalidType = (value, fieldResults) => {
  return {
    value,
    fieldResults,
    valid: false,
    ap: fieldResult => InvalidType(value(fieldResult.value), { ...fieldResults, [fieldResult.name]: fieldResult }),
    validFields: () => filterFieldResults(validPredicate, fieldResults),
    invalidFields: () => filterFieldResults(invalidPredicate, fieldResults),
  }
}

const validPredicate = result => result.valid;

const invalidPredicate = result => !result.valid;

const filterFieldResults = (predicate, results) =>
  Object.values(results)
    .filter(predicate)
    .map(result => { return { [result.name]: result }; })
    .reduce((fields, next) => Object.assign({}, fields, next), {});
