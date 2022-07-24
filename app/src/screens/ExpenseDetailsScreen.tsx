import { Layout } from '@design-system/layout/Layout';
import { EditExpenseComment, ExpenseInfo } from '@features/expenses';
import { useExpense } from '@features/expenses/useExpense';
import { Expense } from '@models/Expense';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { RootStackParamList } from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseDetails'>;

export const ExpenseDetailsScreen: React.FC<Props> = ({ route }) => {
  const { expense } = route.params;
  const { updateExpenseComment } = useExpense();
  const onSubmitComment = useCallback(
    (comment: Expense['comment']) => {
      updateExpenseComment(expense, comment);
    },
    [expense, updateExpenseComment]
  );
  return (
    <Layout>
      <ExpenseInfo expense={expense} />
      <EditExpenseComment
        comment={expense.comment}
        updateComment={onSubmitComment}
      />
    </Layout>
  );
};
