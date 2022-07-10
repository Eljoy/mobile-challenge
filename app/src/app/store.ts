import { expenseApi } from '@api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [expenseApi.reducerPath]: expenseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(expenseApi.middleware)
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }
    return middlewares
  },
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
