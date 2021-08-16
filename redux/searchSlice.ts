import {
  createAction,
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Product, TopLevelCategory, TopPageEntity } from "../generated/types";
import productService from "../services/productService";
import topPageService, { TopPageByAlias } from "../services/topPageService";
import { RootState } from "./store";

export interface State{
  searchValue: string;
  topPages: TopPageEntity[];
  products: Product[];
}

export const initialState: State = {
  searchValue: "",
  topPages: [],
  products: [],
};

export const findProductsByText = createAsyncThunk(
  "topPage/findProductsByText",
  async (query: string) => {
    const res = productService.findProductsByText(query);
    return res;
  }
);

export const findTopPageByText = createAsyncThunk(
  "topPage/findTopPagesByText",
  async (query: string) => {
    const res = topPageService.findTopPageByText(query);
    return res;
  }
);

export const searchSlice = createSlice({
  name: "topPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findProductsByText.fulfilled, (state, action) => {
      state.products = (action.payload || []);
    });
    builder.addCase(findTopPageByText.fulfilled, (state, action) => {
      state.topPages = (action.payload || []);
    });
  },
});

// export const { setSortType } = topPageSlice.actions;
