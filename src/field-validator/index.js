export default class Field {
  static validate = value => value.valid === undefined ? ValidField(value) : value;
}

export const ValidField = value => {
  return {
    value,
    valid: true,
    ap: rule => {
      return rule(value);
    }
  };
};

export const InvalidField = (value, errors) => {
  return {
    value,
    errors,
    valid: false,
    ap: rule => {
      const result = rule(value);
      if (result.valid) return InvalidField(value, errors);
      return InvalidField(value, [].concat(errors, result.errors));
    },
  };
};
