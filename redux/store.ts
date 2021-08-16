import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './product';
import { searchSlice } from './searchSlice';
import {topPageSlice} from './topPageSlice';

export const store = configureStore({
  reducer: {
    topPage: topPageSlice.reducer,
    products: productSlice.reducer,
    search: searchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;