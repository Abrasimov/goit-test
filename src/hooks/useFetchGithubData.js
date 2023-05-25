import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../store/slices/githubDataSlice";
import { setTotalPages } from "../store/slices/paginationSlice";

import config from "../config.json";

const { REPOS_PER_PAGE, MAX_VISIBLE_PAGES } = config;

const useFetchGithubData = () => {
    const { searchQuery } = useSelector((state) => state.githubData);
    const { currentPage } = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

    const [reposData, setReposData] = useState([]);

    useEffect(() => {
        dispatch(setLoading(true));

        axios
            .get("https://api.github.com/search/repositories", {
                params: {
                    q: searchQuery,
                    page: currentPage,
                    per_page: REPOS_PER_PAGE,
                },
            })
            .then((response) => {
                const totalPages = Math.ceil(response.data.total_count / REPOS_PER_PAGE);

                if (totalPages - currentPage > MAX_VISIBLE_PAGES) {
                    dispatch(setTotalPages(currentPage + MAX_VISIBLE_PAGES));
                } else {
                    dispatch(setTotalPages(totalPages));
                }

                setReposData(response.data.items);
            })
            .catch((error) => {
                setReposData([]);
                console.error(error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [currentPage, dispatch, searchQuery]);

    return { reposData };
};

export default useFetchGithubData;
