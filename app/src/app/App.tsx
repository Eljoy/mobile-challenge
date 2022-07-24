import { Provider } from 'react-redux';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ExpenseDetailsScreen, ExpensesScreen, RootStack } from '@screens';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Expenses">
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

export default App;
