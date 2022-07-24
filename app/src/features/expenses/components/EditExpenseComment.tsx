import { Layout } from '@design-system/layout/Layout';
import { Expense } from '@models/Expense';
import React, { useCallback, useState } from 'react';
import { TextInput } from 'react-native';

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
    <Layout>
      <TextInput
        value={commentState}
        onChangeText={setCommentState}
        onSubmitEditing={onSubmit}
      />
    </Layout>
  );
};
