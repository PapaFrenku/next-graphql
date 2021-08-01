import { configureStore } from '@reduxjs/toolkit';
import {topPageSlice} from './topPageSlice';

export const store = configureStore({
  reducer: {
    topPage: topPageSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;