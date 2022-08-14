import { Layout } from '@design-system/layout/Layout';
import {
  EditExpenseCommentButton,
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

export const ExpenseDetailsScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { expenseId } = route.params;
  const { updateExpenseComment, expense, addReceiptPhoto } =
    useExpense(expenseId);

  const onSubmitComment = useCallback(
    (comment: Expense['comment']) => {
      updateExpenseComment(expense, comment);
    },
    [expense, updateExpenseComment]
  );

  const onPressEditComment = useCallback(() => {
    navigation.navigate('EditTextField', {
      value: expense.comment,
      onSubmit: onSubmitComment,
    });
  }, [expense.comment, navigation, onSubmitComment]);

  return (
    <Layout>
      <ExpenseInfo expense={expense} />
      <PaidBy user={expense.user} />
      <EditExpenseCommentButton
        comment={expense.comment}
        onPress={onPressEditComment}
      />
      <EditReceipts expense={expense} onAddReceiptPhoto={addReceiptPhoto} />
    </Layout>
  );
};
