import { Expense } from '@models/Expense';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Expenses: undefined;
  ExpenseDetails: { expenseId: Expense['id'] };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
