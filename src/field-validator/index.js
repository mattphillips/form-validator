export const valid = (value) => {
  return {
    value,
    valid: true,
  };
};

export const invalid = (value, errors) => {
  return {
    value,
    errors,
    valid: false,
  };
};
