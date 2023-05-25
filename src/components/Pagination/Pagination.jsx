import { useSelector, useDispatch } from "react-redux";

import { setCurrentPage } from "../../store/slices/paginationSlice";
import usePagination from "../../hooks/usePagination";

import style from "./pagination.module.css";

import config from "../../config.json";

const { MAX_VISIBLE_PAGES } = config;

const Pagination = () => {
    const { loading } = useSelector((state) => state.githubData);
    const { currentPage, isPreviousPagePresent, isNextPagePresent } = useSelector(
        (state) => state.pagination
    );
    const dispatch = useDispatch();

    const { openNextPage, openPreviousPage, pagesNumbers } = usePagination();

    const rootClass = `${style.root} ${loading ? style.root__disabled : ""}`;

    return (
        <div className={rootClass}>
            <button
                className={style.paginationControl}
                onClick={openPreviousPage}
                disabled={!isPreviousPagePresent}
            >
                Previous
            </button>
            {pagesNumbers.map((_, index) => {
                const pageNumber = index + 1;
                const isPageSelected = currentPage === pageNumber;

                /**
                 * E.g.: If selected page number 10 user should see only
                 * pages 5-15 (if MAX_VISIBLE_PAGES is 10)
                 */
                if (
                    pageNumber - currentPage < -(MAX_VISIBLE_PAGES / 2) ||
                    pageNumber - currentPage > MAX_VISIBLE_PAGES / 2
                ) {
                    return null;
                }

                const pageButtonClass = `${style.pageButton} ${
                    isPageSelected ? style.pageButton__selected : ""
                }`;

                return (
                    <button
                        className={pageButtonClass}
                        key={pageNumber}
                        onClick={() => dispatch(setCurrentPage(pageNumber))}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                className={style.paginationControl}
                onClick={openNextPage}
                disabled={!isNextPagePresent}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
