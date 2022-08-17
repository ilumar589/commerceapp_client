import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { PagedProducts, Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<PagedProducts>(
    'catalog/fetchProductsAsync',
    async (_, thunkApi) => {
        try {
            return await agent.Catalog.list();
        } catch (error:any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, {productId: string}>(
    'catalog/fetchProductAsync',
    async ({productId}, thunkApi) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle',
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload.content);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        // fetch single product
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);