import { valid, invalid } from '../field-validator';

export default (predicate, error) => value => predicate(value) ? valid(value) : invalid(value, [error]);
