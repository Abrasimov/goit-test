import { useSelector } from "react-redux";

import usePagination from "../../hooks/usePagination";
import SearchBar from "../SearchBar";
import RepoCard from "../RepoCard";
import Pagination from "../Pagination";
import Spinner from "../Spinner";

import style from "./app.module.css";

function App() {
    const { githubRepos, loading, error } = useSelector((state) => state.githubData);

    const { currentPage, setCurrentPage, ...paginationProps } = usePagination();

    let content;

    if (loading) {
        content = <Spinner />;
    } else if (error) {
        content = (
            <div className={style.noResults}>
                <p>Unexpected error occurred. Please, try again later.</p>
            </div>
        );
    } else if (githubRepos.length === 0) {
        content = (
            <div className={style.noResults}>
                <p>Repositories not found.</p>
            </div>
        );
    } else {
        content = githubRepos.map((repo) => {
            return <RepoCard key={repo.id} data={repo} />;
        });
    }

    return (
        <div className={style.root}>
            <div className={style.pageWrapper}>
                <SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <div className={style.contentWrapper}>{content}</div>
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
