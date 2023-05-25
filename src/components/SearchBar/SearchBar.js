import style from "./searchBar.module.css";

const SearchBar = () => {
    return <input className={style.root} placeholder={"Search"} />;
};

export default SearchBar;
