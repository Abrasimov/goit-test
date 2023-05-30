import { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import config from "../config.json";

const { REPOS_PER_PAGE, MAX_VISIBLE_PAGE_NUMBERS } = config;

const getTotalReposAmountState = (state) => state.githubData.totalReposAmount;

const usePagination = () => {
    const totalReposAmount = useSelector(getTotalReposAmountState);

    const [currentPage, setCurrentPage] = useState(1);
    const [visiblePages, setVisiblePages] = useState(1);
    const [isPreviousPagePresent, setIsPreviousPagePresent] = useState(false);
    const [isNextPagePresent, setIsNextPagePresent] = useState(false);

    // Calculate visible pages value
    useEffect(() => {
        const totalPages = Math.ceil(totalReposAmount / REPOS_PER_PAGE);

        if (totalPages - currentPage > MAX_VISIBLE_PAGE_NUMBERS) {
            setVisiblePages(currentPage + MAX_VISIBLE_PAGE_NUMBERS);
        } else {
            setVisiblePages(totalPages);
        }
    }, [currentPage, totalReposAmount]);

    // Handle enabling/disabling Previous and Next pagination buttons
    useEffect(() => {
        let isPreviousPagePresent = true;
        let isNextPagePresent = true;

        if (visiblePages === 0) {
            isPreviousPagePresent = false;
            isNextPagePresent = false;
        }

        if (visiblePages === 1 || currentPage === 1) {
            isPreviousPagePresent = false;
        }

        if (currentPage === visiblePages) {
            isNextPagePresent = false;
        }

        setIsPreviousPagePresent(isPreviousPagePresent);
        setIsNextPagePresent(isNextPagePresent);
    }, [currentPage, visiblePages]);

    const openNextPage = useCallback(() => {
        setCurrentPage((prevState) => prevState + 1);
    }, []);

    const openPreviousPage = useCallback(() => {
        setCurrentPage((prevState) => prevState - 1);
    }, []);

    // Generate array with page numbers (E.g.: [5, 6, 7, 8])
    const pagesNumbers = useMemo(() => {
        return Array.from({ length: visiblePages }, (_, index) => {
            const pageNumber = index + 1;

            const isPageInRange =
                Math.abs(pageNumber - currentPage) <= MAX_VISIBLE_PAGE_NUMBERS / 2;

            /**
             * E.g.: If selected page number 10 user should see only
             * pages 5-15 (if MAX_VISIBLE_PAGE_NUMBERS is 10)
             */
            if (!isPageInRange) {
                return null;
            }

            return pageNumber;
        }).filter((pageNumber) => !!pageNumber);
    }, [currentPage, visiblePages]);

    return {
        currentPage,
        setCurrentPage,
        openNextPage,
        openPreviousPage,
        isNextPagePresent,
        isPreviousPagePresent,
        pagesNumbers,
    };
};

export default usePagination;
