import { Avatar, Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout';
import { Font, FontColor, Text } from '@design-system/typography';
import { groupByDate } from '@features/expenses/lib/groupByDate';
import { Expense } from '@models/Expense';
import { FlashList, FlashListProps, ListRenderItem } from '@shopify/flash-list';
import React, { memo, useCallback, useMemo } from 'react';
import { TouchableHighlight } from 'react-native';

export declare namespace ExpenseList {
  export type Props = {
    expenses: Expense[];
    onExpensePressed: (expense: Expense) => void;
  } & Partial<FlashListProps<Expense>>;
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
    const expenseData = useMemo(
      () => Object.entries(groupByDate(expenses)).flat(2),
      [expenses]
    );

    const renderItem: ListRenderItem<Expense | string> = useCallback(
      (info: any) =>
        typeof info.item === 'string' ? (
          <ListSection date={info.item} />
        ) : (
          <ListItem expense={info.item} onListItemPressed={onExpensePressed} />
        ),
      [onExpensePressed]
    );

    return (
      <FlashList
        data={expenseData as any}
        renderItem={renderItem}
        scrollEventThrottle={16}
        {...props}
      />
    );
  }
);
