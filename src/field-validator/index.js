export default class Field {
  static validate = (value, name) => ValidField(value, name);
}

export const ValidField = (value, name) => {
  return {
    value,
    name,
    valid: true,
    ap: rule => rule(value, name),
  };
};

export const InvalidField = (value, name, errors) => {
  return {
    value,
    name,
    errors,
    valid: false,
    ap: rule => {
      const result = rule(value, name);
      if (result.valid) return InvalidField(value, name, errors);
      return InvalidField(value, name, [].concat(errors, result.errors));
    },
  };
};
