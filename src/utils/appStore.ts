import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import  userReducer  from './userSlice';

export const appStore = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore