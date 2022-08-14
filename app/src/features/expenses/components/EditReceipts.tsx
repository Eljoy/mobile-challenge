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
  };
}

export const EditReceipts: React.FC<EditReceipts.Props> = React.memo(
  ({ onAddReceiptPhoto, expense }) => {
    const receipts = useMemo(() => {
      return expense.receipts.map((r) => {
        return (
          <Layout key={r.url}>
            <ReceiptPreview source={{ uri: `${API_URL}${r.url}` }} />
            <Spacer widthScale={3} />
          </Layout>
        );
      });
    }, [expense.receipts]);
    return (
      <Layout direction="row" paddingHorizontalScale={3}>
        {receipts}
        <Spacer widthScale={3} />
        <AddReceiptButton onPress={() => onAddReceiptPhoto(expense)} />
      </Layout>
    );
  }
);
