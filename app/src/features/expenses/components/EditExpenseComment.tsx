import { Icon } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { spaceScale } from '@design-system/lib';
import { Font, FontColor, getFontStyle } from '@design-system/typography';
import { Expense } from '@models/Expense';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export declare namespace EditExpenseComment {
  export type Props = {
    comment: Expense['comment'];
    updateComment: (comment: Expense['comment']) => void;
  };
}

export const EditExpenseComment: React.FC<EditExpenseComment.Props> = ({
  comment,
  updateComment,
}) => {
  const [commentState, setCommentState] = useState(comment);

  const onSubmit = useCallback(() => {
    updateComment(commentState);
  }, [commentState, updateComment]);

  return (
    <Layout paddingScale={3} align="start center" direction="row">
      <Icon name="message-square" />
      <TextInput
        style={[styles.textInput, getFontStyle(Font.Body1, FontColor.Primary)]}
        value={commentState}
        onChangeText={setCommentState}
        onSubmitEditing={onSubmit}
        placeholder="Add Comment..."
        selectionColor={FontColor.Primary}
        placeholderTextColor={FontColor.Secondary}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: spaceScale[1],
    paddingHorizontal: spaceScale[2],
  },
});
