import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import { setSearchQuery } from "../store/slices/githubDataSlice";
import { setCurrentPage } from "../store/slices/paginationSlice";

import config from "../config.json";

const { DEFAULT_SEARCH_QUERY, SEARCH_DEBOUNCE_TIMEOUT } = config;

const useSearchBar = () => {
    const dispatch = useDispatch();

    const debounceTimeout = useRef();

    const debouncedHandleChange = useCallback(
        (event) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(() => {
                const inputValue = event.target.value;

                dispatch(setCurrentPage(1));
                dispatch(setSearchQuery(inputValue || DEFAULT_SEARCH_QUERY));
            }, SEARCH_DEBOUNCE_TIMEOUT);
        },
        [dispatch]
    );

    return { debouncedHandleChange };
};

export default useSearchBar;
