import { Layout } from '@design-system/layout/Layout';
import { API_URL } from '@env';
import { Expense } from '@models/Expense';
import React, { useMemo } from 'react';
import { Button } from 'react-native';
import FastImage from 'react-native-fast-image';

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
          <FastImage
            key={r.url}
            source={{ uri: `${API_URL}${r.url}` }}
            style={{ width: 40, height: 40 }}
          />
        );
      });
    }, [expense.receipts]);
    return (
      <Layout>
        <Layout direction="row">{receipts}</Layout>
        <Button
          title="Add Receipt"
          onPress={() => onAddReceiptPhoto(expense)}
        />
      </Layout>
    );
  }
);
