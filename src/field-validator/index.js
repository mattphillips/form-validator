export default class Field {
  static validate = value => value.valid === undefined ? valid(value) : value;
}

export const valid = value => {
  return {
    value,
    valid: true,
    ap: rule => {
      return rule(value);
    }
  };
};

export const invalid = (value, errors) => {
  return {
    value,
    errors,
    valid: false,
    ap: rule => {
      const result = rule(value);
      if (result.valid) return invalid(value, errors);
      return invalid(value, [].concat(errors, result.errors));
    },
  };
};
