import moment from 'moment';
import { Amount } from './Amount';
import { User } from './User';

export type Expense = {
  id: string;
  amount: Amount;
  date: string;
  formattedDate: string;
  time: string;
  merchant: string;
  receipts: { url: string }[];
  comment: string;
  category: string;
  user: User;
};

export const deserializeExpense = (
  expenseJSON: Omit<Expense, 'formattedDate' | 'time'>
) => {
  const date = moment(expenseJSON.date);
  return {
    ...expenseJSON,
    formattedDate: date.format('DD MMMM YYYY, HH:mm'),
    time: date.format('HH:mm'),
  };
};
