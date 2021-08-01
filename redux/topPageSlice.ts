import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TopLevelCategory, TopPageEntity } from '../generated/types';
import topPageService from '../services/topPageService';

export interface TopPageSlice {
    pages: TopPageEntity[]
}

export const initialState:TopPageSlice = {
    pages: []
};

export const findTopPageByCategory = createAsyncThunk(
    'topPage/findTopPageByCategory',
    async (firstCategory: TopLevelCategory) => {
        const res = await topPageService.findByCategory(firstCategory);
        return res;
    }
);



export const topPageSlice = createSlice({
    name: 'topPage',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(findTopPageByCategory.fulfilled, (state, action) => {
            state.pages = action.payload;
        });
    }
});