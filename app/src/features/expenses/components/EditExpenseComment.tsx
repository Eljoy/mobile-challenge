import { Layout } from '@design-system/layout/Layout';
import { spaceScale } from '@design-system/lib';
import { Font, FontColor, getFontStyle } from '@design-system/typography';
import { Expense } from '@models/Expense';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

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
      <Icon
        name="message-square"
        size={normalize(16)}
        color={FontColor.Secondary}
      />
      <TextInput
        style={[styles.textInput, getFontStyle(Font.Body2, FontColor.Primary)]}
        value={commentState}
        onChangeText={setCommentState}
        onSubmitEditing={onSubmit}
        placeholder="Add Comment..."
        selectionColor={FontColor.Primary}
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
