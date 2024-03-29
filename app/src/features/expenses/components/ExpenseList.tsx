import { Avatar, Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout';
import { Colors } from '@design-system/theme';
import { Font, FontColor, Text } from '@design-system/typography';
import { groupByDate } from '@features/expenses/lib/groupByDate';
import { Expense } from '@models/Expense';
import {
  FlashList,
  FlashListProps,
  ListRenderItemInfo,
} from '@shopify/flash-list';
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
      underlayColor={Colors.underlay}
      onPress={() => {
        onListItemPressed(expense);
      }}
    >
      <Layout direction="row" align="center center" flex={1} paddingScale={3}>
        <Avatar name={expense.merchant} />
        <Spacer widthScale={3} />
        <Layout flex={1} align="center stretch">
          <Layout direction="row" align="space-between center">
            <Text font={Font.Body1}>{expense.merchant}</Text>
            <Text font={Font.Body2} color={FontColor.Secondary}>
              {`${expense.amount.value} ${expense.amount.currency}`}
            </Text>
          </Layout>
          <Spacer heightScale={1} />
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
      () => Object.entries(groupByDate(expenses, 'DD MMMM YYYY')).flat(2),
      [expenses]
    );

    const renderItem = useCallback(
      (info: ListRenderItemInfo<Expense | string>) =>
        typeof info.item === 'string' ? (
          <ListSection key={info.item} date={info.item} />
        ) : (
          <ListItem
            key={info.item.id}
            expense={info.item}
            onListItemPressed={onExpensePressed}
          />
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
