import { getExpenses } from '@api';
import { RootState } from '@app';
import { Expense } from '@models/Expense';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

interface ExpensesState {
  expenses: Expense[];
  total?: number;
  limit: number;
  offset: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  loading: 'idle',
  limit: 25,
  offset: 0,
} as ExpensesState;

const selectMetaData = (state: RootState) => ({
  limit: state.expenses.limit,
  offset: state.expenses.offset,
});

export const fetchExpenses = createAsyncThunk(
  'expenses/getExpenses',
  async (_, { getState }) => {
    const { offset, limit } = selectMetaData(getState() as RootState);
    return await getExpenses(offset, limit);
  }
);

const expenseAdapter = createEntityAdapter<Expense>({
  selectId: (expense) => expense.id,
});

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: { ...initialState, ...expenseAdapter.getInitialState() },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      expenseAdapter.addMany(state, action.payload.expenses);
      state.total = action.payload.total;
      state.offset = state.offset + state.limit;
    });
  },
});

export const expenseSelectors = expenseAdapter.getSelectors<RootState>(
  (state) => state.expenses
);
