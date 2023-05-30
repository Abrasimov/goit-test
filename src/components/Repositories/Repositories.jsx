import { useSelector } from "react-redux";

import RepoCard from "./RepoCard";

import style from "./repositories.module.css";

const getGithubReposState = (state) => state.githubData.githubRepos;

const Repositories = () => {
    const githubRepos = useSelector(getGithubReposState);

    return (
        <>
            {githubRepos.length === 0 ? (
                <div className={style.noResults}>
                    <p>Repositories not found.</p>
                </div>
            ) : (
                githubRepos.map((repo) => {
                    return <RepoCard key={repo.id} data={repo} />;
                })
            )}
        </>
    );
};

export default Repositories;
