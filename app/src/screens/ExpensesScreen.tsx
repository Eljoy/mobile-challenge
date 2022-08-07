import { SearchBar } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { ExpenseList } from '@features/expenses';
import { useExpenseList } from '@features/expenses/useExpenseList';
import { Expense } from '@models/Expense';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Expenses'>;

export const ExpensesScreen: React.FC<Props> = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { expenses, triggerNext } = useExpenseList({ searchKeyword });

  const onExpensePressed = useCallback(
    (expense: Expense) => {
      navigation.navigate('ExpenseDetails', { expenseId: expense.id });
    },
    [navigation]
  );

  return (
    <Layout style={styles.container}>
      <SearchBar onSearchKeywordChanged={setSearchKeyword} />
      <ExpenseList
        expenses={expenses}
        onEndReached={triggerNext}
        onExpensePressed={onExpensePressed}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
