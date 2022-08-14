import { Provider } from 'react-redux';

import React from 'react';

import { Colors } from '@design-system/theme';
import { NavigationContainer } from '@react-navigation/native';
import { ExpenseDetailsScreen, ExpensesScreen, RootStack } from '@screens';
import { StatusBar, StyleSheet } from 'react-native';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" animated={true} />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Expenses"
          screenOptions={{
            headerStyle: styles.header,
            contentStyle: styles.content,
            headerBackTitleVisible: false,
            headerTintColor: 'white',
          }}
        >
          <RootStack.Screen name="Expenses" component={ExpensesScreen} />
          <RootStack.Screen
            name="ExpenseDetails"
            component={ExpenseDetailsScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  header: { backgroundColor: Colors.brand },
  content: {
    backgroundColor: Colors.white,
  },
});

export default App;
