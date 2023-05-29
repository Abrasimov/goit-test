import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import fetchGithubDataApi from "../../api/githubDataApi";

import config from "../../config.json";

const { REPOS_PER_PAGE, MAX_VISIBLE_PAGES } = config;

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
        totalPages: 1,
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

                const { currentPage, items, total_count } = action.payload;

                const totalPages = Math.ceil(total_count / REPOS_PER_PAGE);

                if (totalPages - currentPage > MAX_VISIBLE_PAGES) {
                    state.totalPages = currentPage + MAX_VISIBLE_PAGES;
                } else {
                    state.totalPages = totalPages;
                }

                state.githubRepos = items;
            })
            .addCase(fetchGithubData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default githubDataSlice.reducer;
