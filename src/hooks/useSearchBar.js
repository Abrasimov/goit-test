import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchGithubData } from "../store/slices/githubDataSlice";

import config from "../config.json";

const { DEFAULT_SEARCH_QUERY, SEARCH_DEBOUNCE_TIMEOUT } = config;

const useSearchBar = (currentPage, setCurrentPage) => {
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);

    const debounceTimeout = useRef();

    const debouncedHandleChange = useCallback(
        (event) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(() => {
                const inputValue = event.target.value;

                setSearchQuery(inputValue);
                setCurrentPage(1);
            }, SEARCH_DEBOUNCE_TIMEOUT);
        },
        [setCurrentPage]
    );

    useEffect(() => {
        dispatch(fetchGithubData({ searchQuery, currentPage }));
    }, [dispatch, searchQuery, currentPage]);

    return { debouncedHandleChange };
};

export default useSearchBar;
