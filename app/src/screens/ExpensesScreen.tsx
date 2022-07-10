import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { RootStackParamList } from './RootStack'

type Props = NativeStackScreenProps<RootStackParamList, 'Expenses'>

export const ExpensesScreen: React.FC<Props> = () => {
  return (
    <>
      <Text>Expenses Screen</Text>
    </>
  )
}
