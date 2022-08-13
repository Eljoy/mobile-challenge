import { API_URL } from '@env';
import { deserializeExpense, Expense } from '@models/Expense';
import axios from 'axios';

export const getExpenses = async (
  offset = 0,
  limit = 25
): Promise<{ expenses: Expense[]; total: number }> => {
  const { data } = await axios.get<{ expenses: Expense[]; total: number }>(
    `${API_URL}/expenses`,
    { params: { limit, offset } }
  );
  const expenses = data.expenses.map(deserializeExpense);
  return { expenses, total: data.total };
};

export const updateExpenseComment = async (
  id: Expense['id'],
  comment: string
): Promise<Expense> => {
  const { data } = await axios.post<Expense>(`${API_URL}/expenses/${id}`, {
    comment,
  });
  return deserializeExpense(data);
};

export const uploadExpenseReceipt = async (
  id: Expense['id'],
  img: {
    name: string;
    uri: string;
  }
): Promise<Expense> => {
  const body = new FormData();
  body.append('receipt', { ...img, type: 'image/jpeg' });
  const { data } = await axios.post(
    `${API_URL}/expenses/${id}/receipts/`,
    body,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return deserializeExpense(data);
};
