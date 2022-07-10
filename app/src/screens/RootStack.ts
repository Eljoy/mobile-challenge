import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Expenses: undefined
}

export const RootStack = createNativeStackNavigator<RootStackParamList>()
