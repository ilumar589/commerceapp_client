import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const jwtResponse = await agent.Auth.currentUser();
            localStorage.setItem('user', JSON.stringify(jwtResponse));
            return jwtResponse;
        } catch(error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }, 
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
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
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            history.push('/');
        }));
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            console.log(action.payload);
        });
    })
})

export const { signOut, setUser } = authSlice.actions;