import { useSelector } from "react-redux";

import style from "./pagination.module.css";

const getLoadingState = (state) => state.githubData.loading;

const Pagination = ({ currentPage, setCurrentPage, paginationProps }) => {
    const {
        openNextPage,
        openPreviousPage,
        isNextPagePresent,
        isPreviousPagePresent,
        pagesNumbers,
    } = paginationProps;

    const loading = useSelector(getLoadingState);

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
            {pagesNumbers.map((pageNumber) => {
                const isPageSelected = currentPage === pageNumber;

                const pageButtonClass = `${style.pageButton} ${
                    isPageSelected ? style.pageButton__selected : ""
                }`;

                return (
                    <button
                        className={pageButtonClass}
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
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
