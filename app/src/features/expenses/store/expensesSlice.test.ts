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
  test('initialState', () => {
    const expensesResult = {
      expenses: Array.from({ length: 5 }).map(() => generateExpense()),
      total: 10,
    };

    const initialExpenses = expenseSelectors.selectAll(store.getState());
    expect(initialExpenses).toEqual([]);

    jest
      .spyOn(api, 'getExpenses')
      .mockReturnValue(Promise.resolve(expensesResult));

    store.dispatch(fetchExpenses());
  });
});
