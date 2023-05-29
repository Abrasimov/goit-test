import { configureStore } from "@reduxjs/toolkit";

import githubDataReducer from "./slices/githubDataSlice";

export const store = configureStore({
    reducer: {
        githubData: githubDataReducer,
    },
});
