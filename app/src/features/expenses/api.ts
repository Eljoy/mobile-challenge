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
