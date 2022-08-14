import { Spacer } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { API_URL } from '@env';
import { ReceiptPreview } from '@features/expenses';
import { AddReceiptButton } from '@features/expenses/components/AddReceiptButton';
import { Expense } from '@models/Expense';
import React, { useMemo } from 'react';

export declare namespace EditReceipts {
  export type Props = {
    expense: Expense;
    onAddReceiptPhoto: (expense: Expense) => void;
    maxNumberOfReceipts: number;
  };
}

export const EditReceipts: React.FC<EditReceipts.Props> = React.memo(
  ({ onAddReceiptPhoto, expense, maxNumberOfReceipts }) => {
    const receipts = useMemo(() => {
      return expense.receipts.map((r) => {
        return (
          <React.Fragment key={r.url}>
            <ReceiptPreview source={{ uri: `${API_URL}${r.url}` }} />
            <Spacer heightScale={2} widthScale={3} />
          </React.Fragment>
        );
      });
    }, [expense.receipts]);
    const reachedMaxNumberOfReceipts =
      expense.receipts.length === maxNumberOfReceipts;

    return (
      <Layout direction="row" align="start start" paddingHorizontalScale={3}>
        {receipts}
        {!reachedMaxNumberOfReceipts && (
          <AddReceiptButton onPress={() => onAddReceiptPhoto(expense)} />
        )}
      </Layout>
    );
  }
);
