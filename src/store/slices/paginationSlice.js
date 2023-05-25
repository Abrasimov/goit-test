import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    totalPages: 5,
    isPreviousPagePresent: false,
    isNextPagePresent: true,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setIsPreviousPagePresent: (state, action) => {
            state.isPreviousPagePresent = !!action.payload;
        },
        setIsNextPagePresent: (state, action) => {
            state.isNextPagePresent = !!action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        goToNextPage: (state) => {
            state.currentPage += 1;
        },
        goToPreviousPage: (state) => {
            state.currentPage -= 1;
        },
    },
});

export const {
    setIsPreviousPagePresent,
    setIsNextPagePresent,
    setCurrentPage,
    setTotalPages,
    goToNextPage,
    goToPreviousPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
