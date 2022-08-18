import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { PagedProducts, Product, ProductFilterOptions, ProductSearchBodyParams, ProductSearchParams, toProductSearchBodyPams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

function getProductQueryParams(productParams: ProductSearchParams) {
    const params = new URLSearchParams();
    params.append("page", productParams.page.toString());
    params.append("size", productParams.size.toString());
    params.append("sort", productParams.orderBy);

    return params;
}

export const fetchProductsAsync = createAsyncThunk<PagedProducts, void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkApi) => {
        const wholeProductParams: ProductSearchParams = thunkApi.getState().catalog.productParams;
        const queryParams: URLSearchParams = getProductQueryParams(wholeProductParams);
        const bodyParams: ProductSearchBodyParams = toProductSearchBodyPams(wholeProductParams);
        try {
            return await agent.Catalog.list(bodyParams, queryParams);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, { productId: string }>(
    'catalog/fetchProductAsync',
    async ({ productId }, thunkApi) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchProductFilterOptionsAsync = createAsyncThunk<ProductFilterOptions>(
    'catalog/fetchProductFilterOptionsAsync',
    async (_, thunkApi) => {
        try {
            return await agent.Catalog.filters();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);


interface ProductState {
    productsLoaded: boolean,
    status: string,
    filtersLoaded: boolean,
    types: string[],
    brands: string[],
    productParams: ProductSearchParams
};

const extraInitialState: ProductState = {
    productsLoaded: false,
    status: 'idle',
    filtersLoaded: false,
    types: [],
    brands: [],
    productParams: {
        page: 0,
        size: 6,
        orderBy: "name",
        types: [],
        brands: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState<ProductState>(extraInitialState),
    reducers: {
        setProductSearchParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload}
        },
        resetProductSearchParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {
                page: 0,
                size: 6,
                orderBy: "name",
                types: [],
                brands: []
            };
        }
    },
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

        // fetch products filter options
        builder.addCase(fetchProductFilterOptionsAsync.fulfilled, (state, action) => {
            state.types = action.payload.types;
            state.brands = action.payload.brands;
            state.filtersLoaded = true;
        });
    })
})

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);
export const { setProductSearchParams, resetProductSearchParams } = catalogSlice.actions;