import { Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { Font, FontColor, Text } from '@design-system/typography';
import { Expense } from '@models/Expense';
import React from 'react';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

export declare namespace PaidBy {
  export type Props = {
    user: Expense['user'];
  };
}

export const PaidBy: React.FC<PaidBy.Props> = ({ user }) => {
  return (
    <Layout paddingHorizontalScale={3} direction="row" align="start center">
      <Icon name="user" size={normalize(16)} color={FontColor.Secondary} />
      <Spacer widthScale={2} />
      <Text font={Font.Body2} color={FontColor.Primary}>
        {`${user.first} ${user.last}`}
      </Text>
    </Layout>
  );
};
