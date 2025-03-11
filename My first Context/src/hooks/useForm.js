const useForm = () => {
    const handleSubmit = (e, func, setData, navigate, handleError) => {
        e.preventDefault();
        const formData = {};

        for(const [key, value] of new FormData(e.target).entries()) {
            formData[key] = value;
        }

        func(e.target, formData, setData, navigate, handleError);
    }

    return handleSubmit;
}

export { useForm };