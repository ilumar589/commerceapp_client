import { createSlice } from "@reduxjs/toolkit";
import { JwtResponse } from "../../app/models/auth";

interface AuthState {
    user: JwtResponse | null
}

const initialState: AuthState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})