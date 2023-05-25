import { configureStore } from "@reduxjs/toolkit";

import paginationReducer from "./slices/paginationSlice";
import githubDataReducer from "./slices/githubDataSlice";

export const store = configureStore({
    reducer: {
        pagination: paginationReducer,
        githubData: githubDataReducer,
    },
});
