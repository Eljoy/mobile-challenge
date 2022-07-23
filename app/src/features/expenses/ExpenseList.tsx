import { Layout } from '@design-system/layout';
import { groupByDate } from '@features/expenses/lib/groupByDate';
import { Expense } from '@models/Expense';
import React, { memo, useMemo } from 'react';
import {
  SectionList,
  SectionListProps,
  Text,
  TouchableHighlight,
} from 'react-native';

export declare namespace ExpenseList {
  export type Props = {
    expenses: Expense[];
  } & Partial<SectionListProps<Expense>>;
}

const ListSection: React.FC<{ date: string }> = memo(({ date }) => {
  return (
    <Layout style={{ paddingVertical: 20 }}>
      <Layout>
        <Text>{date}</Text>
      </Layout>
    </Layout>
  );
});

const ListItem: React.FC<{ expense: Expense }> = memo(({ expense }) => {
  return (
    <TouchableHighlight>
      <Layout
        direction="row"
        align="space-between center"
        style={{ paddingVertical: 20 }}
      >
        <Layout>
          <Text>{expense.merchant}</Text>
          <Text>{`${expense.user.first} ${expense.user.last}`}</Text>
        </Layout>
        <Layout>
          <Text>{`${expense.amount.value} ${expense.amount.currency}`}</Text>
        </Layout>
      </Layout>
    </TouchableHighlight>
  );
});

export const ExpenseList: React.FC<ExpenseList.Props> = React.memo(
  ({ expenses, ...props }) => {
    const groupedExpenses = useMemo(() => {
      return Object.entries(groupByDate(expenses)).map(
        ([dateKey, expensesValue]) => ({
          title: dateKey,
          data: expensesValue,
        })
      );
    }, [expenses]);

    return (
      <SectionList
        sections={groupedExpenses}
        renderSectionHeader={(info) => (
          <ListSection date={info.section.title} />
        )}
        renderItem={(info) => <ListItem expense={info.item} />}
        scrollEventThrottle={16}
        {...props}
      />
    );
  }
);
