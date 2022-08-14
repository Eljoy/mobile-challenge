import { Icon, Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { Font, Text } from '@design-system/typography';
import { Expense } from '@models/Expense';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

export declare namespace EditExpenseCommentButton {
  export type Props = {
    comment: Expense['comment'];
    onPress: () => void;
  };
}

export const EditExpenseCommentButton: React.FC<
  EditExpenseCommentButton.Props
> = ({ comment, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Layout paddingScale={3} align="start center" direction="row">
        <Icon name="message-square" />
        <Spacer widthScale={2} />
        <Layout flex={1} align="center start">
          <Text numberOfLines={2} font={Font.Body1}>
            {comment || 'Add Comment...'}
          </Text>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
};
