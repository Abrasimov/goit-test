import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: "react",
    loading: true,
};

export const githubDataSlice = createSlice({
    name: "githubData",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
    },
});

export const { setSearchQuery, setLoading } = githubDataSlice.actions;

export default githubDataSlice.reducer;
