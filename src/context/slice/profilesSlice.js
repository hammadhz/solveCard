import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import {logout} from "./authSlice";

export const fetchProfiles = createAsyncThunk("profiles/fetchProfiles", async () => {
    const response = await axiosInstance.get("/profiles");
    return response.data.data;
});

const profilesSlice = createSlice({
    name: "profiles",
    initialState: {
        profiles: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                console.log('setLoading')
                state.status = "loading";
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profiles = action.payload;
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(logout, (state) => {
                state.profiles = [];
                state.status = "idle";
                state.error = null;
            });
    },
});

export default profilesSlice.reducer;