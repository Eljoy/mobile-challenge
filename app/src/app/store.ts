import { expensesSlice } from '@features/expenses';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  expenses: expensesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }
    return middlewares;
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
