import {
  expenseSelectors,
  expensesSlice,
  fetchExpenses,
  updateExpenseComment,
  uploadExpenseReceipt,
} from '@features/expenses';
import { Expense } from '@models/Expense';
import { generateExpense } from '@models/__test-utils__/generateExpense';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as api from '../api';

const rootReducer = combineReducers({
  expenses: expensesSlice.reducer,
});

describe('expensesStore', () => {
  test('getExpenses', async () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const expensesResult = {
      expenses: Array.from({ length: 5 }).map(() => generateExpense()),
      total: 10,
    };

    jest
      .spyOn(api, 'getExpenses')
      .mockReturnValue(Promise.resolve(expensesResult));

    const initialExpenses = expenseSelectors.selectAll(store.getState());
    expect(initialExpenses).toEqual([]);

    const fulfilled = await fetchExpenses()(store.dispatch, store.getState, {});
    store.dispatch(fulfilled);

    const resultExpenses = expenseSelectors.selectAll(store.getState());
    expect(resultExpenses).toEqual(expensesResult.expenses);
  });

  test('updateExpenseComment', async () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const expenses = Array.from({ length: 5 }).map(() => generateExpense());

    const updatedExpense = { ...expenses[0], comment: 'testComment' };

    jest
      .spyOn(api, 'updateExpenseComment')
      .mockReturnValue(Promise.resolve(updatedExpense));

    store.dispatch({
      type: fetchExpenses.fulfilled.type,
      payload: { expenses },
    });

    store.dispatch({
      type: updateExpenseComment.fulfilled.type,
      payload: updatedExpense,
    });

    const resultExpense = expenseSelectors.selectById(
      store.getState(),
      updatedExpense.id
    );

    expect(resultExpense).toEqual(updatedExpense);
  });

  test('uploadExpenseReceipt', async () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const expenses = Array.from({ length: 5 }).map(() => generateExpense());

    const updatedExpense: Expense = {
      ...expenses[0],
      receipts: [{ url: 'receiptUrl' }],
    };

    jest
      .spyOn(api, 'uploadExpenseReceipt')
      .mockReturnValue(Promise.resolve(updatedExpense));

    store.dispatch({
      type: fetchExpenses.fulfilled.type,
      payload: { expenses },
    });

    store.dispatch({
      type: uploadExpenseReceipt.fulfilled.type,
      payload: updatedExpense,
    });

    const resultExpense = expenseSelectors.selectById(
      store.getState(),
      updatedExpense.id
    );

    expect(resultExpense).toEqual(updatedExpense);
  });
});
