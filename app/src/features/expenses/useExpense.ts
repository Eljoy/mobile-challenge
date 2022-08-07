import { RootState } from '@app';
import { makeReceiptPhoto } from '@features/expenses/lib/ReceiptCamera';
import { Expense } from '@models/Expense';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  expenseSelectors,
  updateExpenseComment as updateExpenseCommentAction,
  uploadExpenseReceipt as uploadExpenseReceiptAction,
} from './store';

export const useExpense = (expenseId: Expense['id']) => {
  const dispatch = useDispatch();

  const selectedExpense = useSelector((state: RootState) =>
    expenseSelectors.selectById(state, expenseId)
  );

  const updateExpenseComment = useCallback(
    ({ id }: Expense, comment: Expense['comment']) => {
      dispatch(updateExpenseCommentAction({ comment, id }) as any);
    },
    [dispatch]
  );

  const addReceiptPhoto = useCallback(
    async (expense: Expense) => {
      const image = await makeReceiptPhoto(expense);
      if (image?.fileName && image?.uri) {
        dispatch(
          uploadExpenseReceiptAction({
            id: expense.id,
            img: {
              uri: image?.uri,
              name: image?.fileName,
            },
          }) as any
        );
      }
    },
    [dispatch]
  );

  return {
    updateExpenseComment,
    addReceiptPhoto,
    expense: selectedExpense as Expense,
  };
};
