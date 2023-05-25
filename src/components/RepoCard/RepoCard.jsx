import reactIcon from "./assets/react.svg";
import starIcon from "./assets/star.svg";
import watcherIcon from "./assets/watcher.svg";

import style from "./repoCard.module.css";

const RepoCard = ({ data }) => {
    const {
        name,
        owner: { login },
        language,
        description,
        stargazers_count,
        watchers_count,
    } = data;

    return (
        <div className={style.root}>
            <div className={style.image}>
                <img src={reactIcon} alt={""} />
            </div>
            <div className={style.info}>
                <h2 className={style.repoName}>{`Repo name: ${name}`}</h2>
                <p className={style.author}>{`Author: ${login}`}</p>
                <p className={style.language}>{`Language: ${language}`}</p>
                <p className={style.description}>{`Description: ${description}`}</p>
            </div>
            <div className={style.stats}>
                <div className={style.stars}>
                    <img src={starIcon} alt={""} className={style.statsIcon} />
                    <b>{stargazers_count}</b> stars
                </div>
                <div className={style.watchers}>
                    <img src={watcherIcon} alt={""} className={style.statsIcon} />
                    <b>{`${watchers_count} watchers`}</b>
                </div>
            </div>
        </div>
    );
};

export default RepoCard;
