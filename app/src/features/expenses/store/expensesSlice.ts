import { RootState } from '@app';
import { Expense } from '@models/Expense';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import * as expenseApi from '../api';

interface ExpensesState {
  expenses: Expense[];
  total?: number;
  limit: number;
  offset: number;
}

const initialState = {
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
    return await expenseApi.getExpenses(offset, limit);
  }
);

export const updateExpenseComment = createAsyncThunk<
  Awaited<ReturnType<typeof expenseApi.updateExpenseComment>>,
  { id: Expense['id']; comment: Expense['comment'] }
>('expenses/updateExpenseComment', async ({ id, comment }) => {
  return await expenseApi.updateExpenseComment(id, comment);
});

export const uploadExpenseReceipt = createAsyncThunk<
  Awaited<ReturnType<typeof expenseApi.uploadExpenseReceipt>>,
  { id: Expense['id']; img: { uri: string; name: string } }
>('expenses/uploadExpenseReceipt', async ({ id, img }) => {
  return expenseApi.uploadExpenseReceipt(id, img);
});

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
    builder.addCase(updateExpenseComment.fulfilled, (state, action) => {
      expenseAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { comment: action.payload.comment },
      });
    });
    builder.addCase(uploadExpenseReceipt.fulfilled, (state, action) => {
      expenseAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { receipts: action.payload.receipts },
      });
    });
  },
});

export const expenseSelectors = expenseAdapter.getSelectors<RootState>(
  (state) => state.expenses
);
