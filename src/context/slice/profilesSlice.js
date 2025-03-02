import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

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
                state.status = "loading";
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profiles = action.payload;
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default profilesSlice.reducer;