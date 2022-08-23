import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { JwtResponse, LoginRequest } from "../../app/models/auth";
import history from '../../index';

interface AuthState {
    user: JwtResponse | null
}

const initialState: AuthState = {
    user: null
}

export const signInUser = createAsyncThunk<JwtResponse, LoginRequest>(
    'auth/signInUser',
    async (data, thunkAPI) => {
        try {
            const jwtResponse = await agent.Auth.login(data);
            localStorage.setItem('user', JSON.stringify(jwtResponse));
            return jwtResponse;
        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<JwtResponse>(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const jwtResponse = await agent.Auth.currentUser();
            localStorage.setItem('user', JSON.stringify(jwtResponse));
            return jwtResponse;
        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push("/");
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
            console.log(action.payload);
        });
    })
})

export const {signOut } = authSlice.actions;