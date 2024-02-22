import { expect, it } from 'vitest';
import { validateAccountNotEmpty } from './testBalance.js';

it('Should return error message if input field is empty', () => {
  const input = '';

  const validateFn = () => {
    validateAccountNotEmpty(input);
  };

  expect(validateFn).toThrow();
});

it('Should return an error message that contains (Public address is missing)', () => {
  const input = '';

  const validateFn = () => {
    validateAccountNotEmpty(input);
  };

  expect(validateFn).toThrow(/Public address is missing/);
});
