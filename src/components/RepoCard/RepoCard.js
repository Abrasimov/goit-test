import reactIcon from "./assets/react.svg";
import starIcon from "./assets/star.svg";
import watcherIcon from "./assets/watcher.svg";

import style from "./repoCard.module.css";

const RepoCard = () => {
    return <div className={style.root}>
        <div className={style.image}>
            <img src={reactIcon} alt={""} />
        </div>
        <div className={style.info}>
            <h2 className={style.repoName}>Repo name</h2>
            <p className={style.author}>Author</p>
            <p className={style.language}>Language</p>
            <p className={style.description}>Description</p>
        </div>
        <div className={style.stats}>
            <div className={style.stars}>
                <img src={starIcon} alt={""} className={style.statsIcon} />
                <b>146</b> stars
            </div>
            <div className={style.watchers}>
                <img src={watcherIcon} alt={""} className={style.statsIcon} />
                <b>146 watchers</b>
            </div>
        </div>
    </div>;
};

export default RepoCard;
