import { ValidField, InvalidField } from '../field-validator';

export default (predicate, error) => (value, name) => predicate(value) ? ValidField(value, name) : InvalidField(value, name, [error]);
