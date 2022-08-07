import { Layout } from '@design-system/layout';

import { Avatar, Spacer } from '@design-system/components';
import { Font, FontColor, Text } from '@design-system/typography';
import { groupByDate } from '@features/expenses/lib/groupByDate';
import { Expense } from '@models/Expense';
import React, { memo, useMemo } from 'react';
import {
  SectionList,
  SectionListProps,
  TouchableHighlight,
} from 'react-native';

export declare namespace ExpenseList {
  export type Props = {
    expenses: Expense[];
    onExpensePressed: (expense: Expense) => void;
  } & Partial<SectionListProps<Expense>>;
}

const ListSection: React.FC<{ date: string }> = memo(({ date }) => {
  return (
    <Layout paddingScale={3}>
      <Text font={Font.Body2} color={FontColor.Secondary}>
        {date}
      </Text>
    </Layout>
  );
});

const ListItem: React.FC<{
  expense: Expense;
  onListItemPressed: (expense: Expense) => void;
}> = memo(({ expense, onListItemPressed }) => {
  return (
    <TouchableHighlight
      underlayColor="#30353904"
      onPress={() => {
        onListItemPressed(expense);
      }}
    >
      <Layout direction="row" align="center center" flex={1} paddingScale={3}>
        <Avatar name={expense.merchant} />
        <Spacer flex={0} widthScale={3} />
        <Layout flex={1} align="center stretch">
          <Layout direction="row" align="space-between center">
            <Text font={Font.Body1}>{expense.merchant}</Text>
            <Text font={Font.Body2} color={FontColor.Secondary}>
              {`${expense.amount.value} ${expense.amount.currency}`}
            </Text>
          </Layout>
          <Spacer flex={0} heightScale={1} />
          <Text font={Font.Caption} color={FontColor.Secondary}>
            {expense.time}
          </Text>
        </Layout>
      </Layout>
    </TouchableHighlight>
  );
});

export const ExpenseList: React.FC<ExpenseList.Props> = React.memo(
  ({ expenses, onExpensePressed, ...props }) => {
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
        renderItem={(info) => (
          <ListItem expense={info.item} onListItemPressed={onExpensePressed} />
        )}
        scrollEventThrottle={16}
        {...props}
      />
    );
  }
);
