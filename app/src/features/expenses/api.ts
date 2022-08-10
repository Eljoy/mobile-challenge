import { API_URL } from '@env';
import { Expense } from '@models/Expense';
import axios from 'axios';

export const getExpenses = async (
  offset = 0,
  limit = 25
): Promise<{ expenses: Expense[]; total: number }> => {
  const { data } = await axios.get<{ expenses: Expense[]; total: number }>(
    `${API_URL}/expenses`,
    { params: { limit, offset } }
  );
  return data;
};

export const updateExpenseComment = async (
  id: Expense['id'],
  comment: string
): Promise<Expense> => {
  const { data } = await axios.post<Expense>(`${API_URL}/expenses/${id}`, {
    comment,
  });
  return data;
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
  return data;
};
