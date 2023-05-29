import { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const usePagination = () => {
    const { totalPages } = useSelector((state) => state.githubData);

    const [currentPage, setCurrentPage] = useState(1);
    const [isPreviousPagePresent, setIsPreviousPagePresent] = useState(false);
    const [isNextPagePresent, setIsNextPagePresent] = useState(true);

    // Handle enabling/disabling Previous and Next pagination buttons
    useEffect(() => {
        let isPreviousPagePresent = true;
        let isNextPagePresent = true;

        if (totalPages === 0) {
            isPreviousPagePresent = false;
            isNextPagePresent = false;
        }

        if (currentPage === 1) {
            isPreviousPagePresent = false;
        }

        if (currentPage === totalPages) {
            isNextPagePresent = false;
        }

        setIsPreviousPagePresent(isPreviousPagePresent);
        setIsNextPagePresent(isNextPagePresent);
    }, [currentPage, totalPages]);

    const openNextPage = useCallback(() => {
        setCurrentPage((prevState) => prevState + 1);
    }, []);

    const openPreviousPage = useCallback(() => {
        setCurrentPage((prevState) => prevState - 1);
    }, []);

    // Generate array with page numbers (E.g.: [1, 2, 3, 4])
    const pagesNumbers = useMemo(() => {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }, [totalPages]);

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
