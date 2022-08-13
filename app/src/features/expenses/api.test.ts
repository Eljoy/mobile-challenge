import { generateExpense } from '@models/__test-utils__/generateExpense';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('expenses/api', () => {
  beforeEach(() => {
    mock.reset();
  });

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

  test('updateExpenseComment', async () => {
    const expense = generateExpense();
    mock.onPost(new RegExp('expenses', 'i')).reply((config) => {
      const { url, data } = config;
      expect(url?.endsWith(expense.id)).toBeTruthy();
      expect(data).toEqual(JSON.stringify({ comment: expense.comment }));
      return [200, expense];
    });
    const { updateExpenseComment } = require('@features/expenses/api');
    const result = await updateExpenseComment(expense.id, expense.comment);
    expect(result).toEqual(expense);
  });

  test('uploadExpenseReceipt', async () => {
    const expense = generateExpense();
    mock.onPost(new RegExp('expenses', 'i')).reply((config) => {
      const { url, headers } = config;
      expect(url?.includes(expense.id)).toBeTruthy();
      expect(headers).toEqual({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      });
      return [200, expense];
    });
    const { uploadExpenseReceipt } = require('@features/expenses/api');
    const result = await uploadExpenseReceipt(expense.id, {
      url: 'url',
      name: 'name',
    });
    expect(result).toEqual(expense);
  });
});
