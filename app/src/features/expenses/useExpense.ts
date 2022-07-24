import { Expense } from '@models/Expense';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateExpenseComment as updateExpenseCommentAction } from './store';

export const useExpense = () => {
  const dispatch = useDispatch();

  const updateExpenseComment = useCallback(
    (expense: Expense, comment: Expense['comment']) => {
      dispatch(updateExpenseCommentAction({ comment, id: expense.id }) as any);
    },
    [dispatch]
  );

  return { updateExpenseComment };
};
