import { Layout } from '@design-system/layout/Layout';
import { Expense } from '@models/Expense';
import React from 'react';
import { Text } from 'react-native';

export declare namespace ExpenseInfo {
  export type Props = {
    expense: Expense;
  };
}

export const ExpenseInfo: React.FC<ExpenseInfo.Props> = React.memo(
  ({ expense }) => {
    return (
      <Layout>
        <Text>merchant {expense.merchant}</Text>
        <Text>Paid by {expense.user.first + expense.user.last}</Text>
      </Layout>
    );
  }
);
