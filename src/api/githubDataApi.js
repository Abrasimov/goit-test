import axios from "axios";

import config from "../config.json";

const { REPOS_PER_PAGE } = config;

const fetchGithubDataApi = async ({ searchQuery }) => {
    const response = await axios.get("https://api.github.com/search/repositories", {
        params: {
            q: searchQuery,
            per_page: REPOS_PER_PAGE,
        },
    });

    return response.data;
};

export default fetchGithubDataApi;
