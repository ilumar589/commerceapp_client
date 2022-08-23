import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: string, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch(error) {
            console.log(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<Basket, {productId: string, quantity?: number}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity = 1}) => {
        try {
            return await agent.Basket.removeItem(productId, quantity);
        } catch(error) {
            console.log(error);
        }
    }
)

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch(error:any) {
           return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });

        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state) => {
            state.status = 'idle';
        });
        
    })
})

export const { setBasket } = basketSlice.actions;