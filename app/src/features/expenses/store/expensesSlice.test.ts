import {
  expenseSelectors,
  expensesSlice,
  fetchExpenses,
} from '@features/expenses';
import { generateExpense } from '@models/__test-utils__/generateExpense';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as api from '../api';

const rootReducer = combineReducers({
  expenses: expensesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

describe('expensesStore', () => {
  test('getExpenses', async () => {
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
});
