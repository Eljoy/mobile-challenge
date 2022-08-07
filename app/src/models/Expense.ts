import { Amount } from './Amount';
import { User } from './User';

export type Expense = {
  id: string;
  amount: Amount;
  date: string;
  formattedDate?: string;
  time?: string;
  merchant: string;
  receipts: { url: string }[];
  comment: string;
  category: string;
  user: User;
};
