import { Layout } from '@design-system/layout/Layout';
import {
  EditExpenseComment,
  EditReceipts,
  ExpenseInfo,
  PaidBy,
} from '@features/expenses';
import { useExpense } from '@features/expenses/useExpense';
import { Expense } from '@models/Expense';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
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
    <Layout flex={1} style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
