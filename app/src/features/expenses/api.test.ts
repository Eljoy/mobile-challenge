import { generateExpense } from '@models/__test-utils__/generateExpense';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('expenses/api', () => {
  test('getExpenses', async () => {
    const expenses = Array.from({ length: 10 }).map(() => generateExpense());
    mock.onGet(new RegExp('expenses', 'i')).reply(200, {
      expenses,
      total: expenses.length,
    });
    const { getExpenses } = require('@features/expenses/api');
    const result = await getExpenses();
    expect(result).toEqual({ expenses, total: expenses.length });
  });
});
