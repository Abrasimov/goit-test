import { useSelector } from "react-redux";

import usePagination from "../../hooks/usePagination";
import SearchBar from "../SearchBar";
import Spinner from "../Spinner";
import Repositories from "../Repositories";
import Pagination from "../Pagination";

import style from "./app.module.css";

const getLoadingState = (state) => state.githubData.loading;
const getErrorState = (state) => state.githubData.error;

function App() {
    const loading = useSelector(getLoadingState);
    const error = useSelector(getErrorState);

    const { currentPage, setCurrentPage, ...paginationProps } = usePagination();

    return (
        <div className={style.root}>
            <div className={style.pageWrapper}>
                <SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <div className={style.contentWrapper}>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className={style.errorWrapper}>
                            <p>Unexpected error occurred. Please, try again later.</p>
                        </div>
                    ) : (
                        <Repositories />
                    )}
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    paginationProps={paginationProps}
                />
            </div>
        </div>
    );
}

export default App;
