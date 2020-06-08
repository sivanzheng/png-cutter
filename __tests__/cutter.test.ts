import { cutter } from '../src';
test('My Greeter', () => {
  expect(cutter('Carl')).toBe('Hello Carl');
});