import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { CategoryReducer } from './category/reducer';
import { CategoryState } from './category/types';

export const store = configureStore({
  reducer: {
    CategoryReducer
  },
});

export interface ApplicationState {
  category: CategoryState;
}


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;