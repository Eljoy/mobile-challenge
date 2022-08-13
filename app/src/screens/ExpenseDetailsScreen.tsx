import { Layout } from '@design-system/layout/Layout';
import {
  EditExpenseComment,
  EditReceipts,
  ExpenseInfo,
  PaidBy,
  useExpense,
} from '@features/expenses';
import { Expense } from '@models/Expense';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React, { useCallback } from 'react';
import { RootStackParamList } from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseDetails'>;

export const ExpenseDetailsScreen: React.FC<Props> = ({ route }) => {
  const { expenseId } = route.params;
  const { updateExpenseComment, expense, addReceiptPhoto } =
    useExpense(expenseId);

  const onSubmitComment = useCallback(
    (comment: Expense['comment']) => {
      updateExpenseComment(expense, comment);
    },
    [expense, updateExpenseComment]
  );

  return (
    <Layout>
      <ExpenseInfo expense={expense} />
      <PaidBy user={expense.user} />
      <EditExpenseComment
        comment={expense.comment}
        updateComment={onSubmitComment}
      />
      <EditReceipts expense={expense} onAddReceiptPhoto={addReceiptPhoto} />
    </Layout>
  );
};
