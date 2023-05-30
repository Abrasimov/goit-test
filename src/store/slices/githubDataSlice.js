import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import fetchGithubDataApi from "../../api/githubDataApi";

export const fetchGithubData = createAsyncThunk(
    "data/fetchGithubData",
    async (params, { rejectWithValue }) => {
        try {
            return await fetchGithubDataApi(params);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const githubDataSlice = createSlice({
    name: "githubData",
    initialState: {
        githubRepos: [],
        totalReposAmount: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGithubData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGithubData.fulfilled, (state, action) => {
                state.loading = false;

                const { items, total_count } = action.payload;

                state.githubRepos = items;
                state.totalReposAmount = total_count;
            })
            .addCase(fetchGithubData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default githubDataSlice.reducer;
