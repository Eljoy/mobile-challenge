import { filterBy } from '@common';
import {
  expenseSelectors,
  fetchExpenses,
} from '@features/expenses/store/expensesSlice';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

export declare namespace useExpenseList {
  export type Props = {
    searchKeyword?: string;
  };
}

export const useExpenseList = ({
  searchKeyword,
}: useExpenseList.Props = {}) => {
  const dispatch = useDispatch();
  const expenses = useSelector(expenseSelectors.selectAll);

  const triggerNext = useCallback(() => {
    dispatch(fetchExpenses() as unknown as AnyAction);
  }, [dispatch]);

  const filteredExpenses = useMemo(() => {
    return searchKeyword
      ? filterBy(
          expenses,
          ['user.first', 'user.last', 'merchant', 'comment'],
          searchKeyword
        )
      : expenses;
  }, [expenses, searchKeyword]);

  useEffect(() => {
    triggerNext();
  }, [dispatch, triggerNext]);

  return { expenses: filteredExpenses, triggerNext };
};
