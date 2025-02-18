import { useState } from 'react';
import { useError } from './useError.js';

const fetchData = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// obj for start state value

const obj = {
    name: "The Octocat",
    login: "octocat",
    bio: null,
    created_at: new Date("2025-02-25T02:22:32Z"),
    avatar_url: "/logo.png",
    html_url: "#",
    location: null,
    public_repos: 8,
    followers: 3938,
    following: 9
}

const useForm = () => {
    const [data, setData] = useState(obj);
    const [isError, handleError] = useError(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataFetch = await fetchData(e.target.username.value);
        if(dataFetch.status === undefined) {
            e.target.reset();
            dataFetch.created_at = new Date(dataFetch.created_at);
            handleError(false);
            setData(dataFetch);
        } else {
            handleError(true);
        }
    }

    return [data, isError, handleSubmit];
}

export { useForm };