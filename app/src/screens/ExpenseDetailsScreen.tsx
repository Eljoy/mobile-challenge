import { Layout } from '@design-system/layout/Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Expenses'>;

export const ExpenseDetailsScreen: React.FC<Props> = () => {
  return <Layout />;
};
