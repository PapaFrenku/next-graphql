import {
  createAction,
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { SortEnum } from "../components/Sort";
import { TopLevelCategory, TopPageEntity } from "../generated/types";
import topPageService, { TopPageByAlias } from "../services/topPageService";
import { RootState } from "./store";

export interface TopPageSlice {
  pages: TopPageEntity[];
  currentPage: TopPageByAlias | null;
  sort: SortEnum;
  menuTopPages: Omit<TopPageEntity, 'products'>[]
}

export const initialState: TopPageSlice = {
  pages: [],
  currentPage: null,
  sort: SortEnum.Rating,
  menuTopPages: []
};

export const findTopPageByCategory = createAsyncThunk(
  "topPage/findTopPageByCategory",
  async (firstCategory: TopLevelCategory) => {
    const res = await topPageService.findByCategory(firstCategory);
    return res;
  }
);

export const getTopPageByAlias = createAsyncThunk(
  "topPage/getTopPageByAlias",
  async (alias: string) => {
    const res = await topPageService.getTopPageByAlias(alias);
    return res;
  }
);

export const getAllTopPages = createAsyncThunk(
  "topPage/getAllTopPages",
  async () => {
    const res = await topPageService.getAllTopPages();
    
    return uniqBy(res, 'id');
  }
);

const currentPage = (state: RootState) => state.topPage.currentPage;
const sortType = (state: RootState) => state.topPage.sort;

export const currentPageSelector = createDraftSafeSelector(
  [currentPage, sortType],
  (p, st) => {
    if (p) {
      let obj = {...p};
      let products = obj?.products || [];
      products = [...products].sort((a, b) => {
        if (st === SortEnum.Price) {
          return a.price - b.price || 0;
        } else {
          return b.reviewAvg - a.reviewAvg || 0;
        }
      });
      
      return obj = {
        ...obj,
        products
      };
    }
    return p;
  }
);

export const topPageSlice = createSlice({
  name: "topPage",
  initialState,
  reducers: {
    setSortType: function (state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findTopPageByCategory.fulfilled, (state, action) => {
      state.pages = action.payload;
    });
    builder.addCase(getTopPageByAlias.fulfilled, (state, action) => {
      state.currentPage = action.payload;
    });
    builder.addCase(getAllTopPages.fulfilled, (state, action) => {
      state.menuTopPages = action.payload;
    });
  },
});

export const { setSortType } = topPageSlice.actions;
