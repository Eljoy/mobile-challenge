import { generateExpense } from '@models/__test-utils__/generateExpense';
import { generateUser } from '@models/__test-utils__/generateUser';
import { filterBy } from './filterBy';

describe('filterBy', () => {
  test('single field', () => {
    const data = [
      generateExpense({ user: generateUser({ first: 'John' }, true) }, true),
      generateExpense({ user: generateUser({ first: 'George' }, true) }, true),
    ];
    expect(filterBy(data, ['user.first'], 'oh')).toEqual([data[0]]);
  });

  test('multiple fields', () => {
    const data = [
      generateExpense({ user: generateUser({ first: 'Carl' }, true) }, true),
      generateExpense({ user: generateUser({ last: 'OCarlson' }, true) }, true),
      generateExpense({ user: generateUser({ last: 'Newman' }, true) }, true),
    ];
    expect(filterBy(data, ['user.first', 'user.last'], 'arl')).toEqual([
      data[0],
      data[1],
    ]);
  });
});
