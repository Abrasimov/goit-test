import SearchBar from "../SearchBar";
import RepoCard from "../RepoCard";
import Pagination from "../Pagination";

import style from "./App.module.css";

function App() {
    return <div className={style.root}>
        <div className={style.contentWrapper}>
            <SearchBar />
            <div className={style.cardsWrapper}>
                <RepoCard />
                <RepoCard />
                <RepoCard />
            </div>
            <Pagination />
        </div>
    </div>;
}

export default App;
