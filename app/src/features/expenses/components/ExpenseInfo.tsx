import { Avatar, Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { Font, FontColor, Text } from '@design-system/typography';

import { Expense } from '@models/Expense';
import React from 'react';

export declare namespace ExpenseInfo {
  export type Props = {
    expense: Expense;
  };
}

export const ExpenseInfo: React.FC<ExpenseInfo.Props> = React.memo(
  ({ expense }) => {
    return (
      <Layout paddingScale={3} direction="row" align="start center">
        <Avatar name={expense.merchant} />
        <Spacer widthScale={3} />
        <Layout>
          <Text font={Font.Body1} color={FontColor.Primary}>
            {expense.merchant}
          </Text>
          <Spacer heightScale={1} />
          <Text font={Font.Caption} color={FontColor.Secondary}>
            9:40
          </Text>
        </Layout>
      </Layout>
    );
  }
);
