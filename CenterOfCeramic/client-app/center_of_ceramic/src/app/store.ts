import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { CategoryReducer } from './category/reducer';
import { CategoryState } from './category/types';

import { combineReducers } from 'redux';

export const store = configureStore({
  reducer: {
    CategoryReducer
  },
});

export interface ApplicationState {
  category: CategoryState;
}

export const createRootReducer = () =>
  combineReducers({
    category: CategoryReducer,
  });



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;