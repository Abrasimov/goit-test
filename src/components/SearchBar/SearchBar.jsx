import { useSelector } from "react-redux";

import useSearchBar from "../../hooks/useSearchBar";

import style from "./searchBar.module.css";

const SearchBar = ({ currentPage, setCurrentPage }) => {
    const { loading } = useSelector((state) => state.githubData);

    const { debouncedHandleChange } = useSearchBar(currentPage, setCurrentPage);

    return (
        <input
            className={style.root}
            onChange={debouncedHandleChange}
            placeholder={"Search"}
            disabled={loading}
        />
    );
};

export default SearchBar;
