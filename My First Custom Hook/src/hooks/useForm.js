import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";

const useForm = (initialState, value) => {
    const [data, setData] = useState(getLocalStorage(initialState) || value);
    const navigate = useNavigate();

    !getLocalStorage(data) && setLocalStorage(initialState, data);

    const handleSubmit = (e, func, handleError) => {
        e.preventDefault();
        const formData = {};
        for(const [key, value] of new FormData(e.target).entries()) {
            formData[key] = value;
        }

        func(e.target, formData, setData, navigate, handleError);
    }

    return [data, setData, handleSubmit];
}

export { useForm };