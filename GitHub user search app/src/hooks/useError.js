import { useState } from 'react';

const useError = (initialState = false) => {
    const [isError, setIsError] = useState(initialState);

    const handleError = (value) => {
        setIsError(value);
    }

    return [isError, handleError];
}

export { useError };