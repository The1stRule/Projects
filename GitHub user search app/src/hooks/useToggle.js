import { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const useToggle = () => {
    const [darkMode, setDarkMode] = useState(getLocalStorage("darkMode"));

    const handleToggle = () => {
        setDarkMode(prev => {
            setLocalStorage("darkMode", !prev);
            return !prev;
        })
    }

    return [darkMode, handleToggle];
}

export { useToggle };