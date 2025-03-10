import { useState } from "react";

const useError = (initialState = false) => {
    const [isError, setIsError] = useState(initialState);

    const handleError = (bool) => {
        setIsError(bool);
    }

    return [isError, handleError];
}

export { useError };