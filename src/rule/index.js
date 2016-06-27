import { ValidField, InvalidField } from '../field-validator';

export default (predicate, error) => value => predicate(value) ? ValidField(value) : InvalidField(value, [error]);
