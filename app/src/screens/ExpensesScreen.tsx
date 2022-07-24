import { SearchBar } from '@design-system/components';
import { ExpenseList } from '@features/expenses';
import { useExpenseList } from '@features/expenses/useExpenses';
import { Expense } from '@models/Expense';
import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/core/src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { RootStackParamList } from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Expenses'>;

export const ExpensesScreen: React.FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { expenses, triggerNext } = useExpenseList({ searchKeyword });

  const onExpensePressed = useCallback(
    (expense: Expense) => {
      navigation.navigate('ExpenseDetails', { expense });
    },
    [navigation]
  );

  return (
    <>
      <SearchBar onSearchKeywordChanged={setSearchKeyword} />
      <ExpenseList
        expenses={expenses}
        onEndReached={triggerNext}
        onExpensePressed={onExpensePressed}
      />
    </>
  );
};
