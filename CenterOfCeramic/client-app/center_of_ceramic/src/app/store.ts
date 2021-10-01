import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import RootReducer from '../Reducers/RootReducer';
import CategoryReducer from '../Reducers/CategoryReducer';

export const store = configureStore({
  reducer: {
    RootReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;