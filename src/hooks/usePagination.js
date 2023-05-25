import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    goToNextPage,
    goToPreviousPage,
    setIsNextPagePresent,
    setIsPreviousPagePresent,
} from "../store/slices/paginationSlice";

const usePagination = () => {
    const { totalPages, currentPage } = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

    // Handle enabling/disabling Previous and Next pagination buttons
    useEffect(() => {
        let isPreviousPagePresent = true;
        let isNextPagePresent = true;

        if (totalPages === 0) {
            isPreviousPagePresent = false;
            isNextPagePresent = false;
        } else if (currentPage === 1) {
            isPreviousPagePresent = false;
        } else if (currentPage === totalPages) {
            isNextPagePresent = false;
        }

        dispatch(setIsPreviousPagePresent(isPreviousPagePresent));
        dispatch(setIsNextPagePresent(isNextPagePresent));
    }, [dispatch, currentPage, totalPages]);

    const openNextPage = useCallback(() => {
        dispatch(goToNextPage());
    }, [dispatch]);

    const openPreviousPage = useCallback(() => {
        dispatch(goToPreviousPage());
    }, [dispatch]);

    const pagesNumbers = useMemo(() => {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }, [totalPages]);

    return { openNextPage, openPreviousPage, pagesNumbers };
};

export default usePagination;
