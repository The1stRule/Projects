const getLocalSotrage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setLocalSotrage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export { getLocalSotrage, setLocalSotrage };