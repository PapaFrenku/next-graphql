import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../generated/types';
import productService from '../services/productService';

export interface TopPageSlice {
    product: Product | null
    products: Product[]
}

export const initialState:TopPageSlice = {
    product: null,
    products: []
};

export const getProduct = createAsyncThunk(
    'products/getProduct',
    async (id: number) => {
        const res = await productService.getProduct(id);
        return res;
    }
);

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const res = await productService.getProducts();
        return res;
    }
);



export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload;
        });

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    }
});