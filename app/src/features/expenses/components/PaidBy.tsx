import { Icon, Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { Font, FontColor, Text } from '@design-system/typography';
import { Expense } from '@models/Expense';
import React from 'react';

export declare namespace PaidBy {
  export type Props = {
    user: Expense['user'];
  };
}

export const PaidBy: React.FC<PaidBy.Props> = ({ user }) => {
  return (
    <Layout paddingHorizontalScale={3} direction="row" align="start center">
      <Icon name="user" />
      <Spacer widthScale={2} />
      <Text font={Font.Body1} color={FontColor.Primary}>
        {`${user.first} ${user.last}`}
      </Text>
    </Layout>
  );
};
