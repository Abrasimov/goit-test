import { useSelector } from "react-redux";

import useFetchGithubData from "../../hooks/useFetchGithubData";
import SearchBar from "../SearchBar";
import RepoCard from "../RepoCard";
import Pagination from "../Pagination";
import Spinner from "../Spinner";

import style from "./App.module.css";

function App() {
    const { loading, searchQuery } = useSelector((state) => state.githubData);

    const { reposData } = useFetchGithubData();

    const cardsContent =
        reposData.length > 0 ? (
            reposData.map((repo) => {
                return <RepoCard key={repo.id} data={repo} />;
            })
        ) : (
            <div className={style.noResults}>
                <p>{`No results found for the "${searchQuery}" search query.`}</p>
            </div>
        );

    return (
        <div className={style.root}>
            <div className={style.contentWrapper}>
                <SearchBar />
                <div className={style.cardsWrapper}>{loading ? <Spinner /> : cardsContent}</div>
                <Pagination />
            </div>
        </div>
    );
}

export default App;
