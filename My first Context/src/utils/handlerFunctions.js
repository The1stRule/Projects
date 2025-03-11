import { getLocalSotrage, setLocalSotrage } from "./localStorage.js"

const register = (target, formData, setData, navigate, handleError) => {
    handleError(false);
    for(const user of getLocalSotrage("users")) {
        if(user.email === formData.email) {
            handleError(true);
            return;
        }
    }

    target.reset();
    setData(prev => {
        setLocalSotrage("users", [...prev, formData]);
        return [...prev, formData];
    });
    navigate("/authorization");
}

const authorization = (target, formData, setData, navigate, handleError) => {
    handleError(false);
    for(const user of getLocalSotrage("users")) {
        if(user.email === formData.email && user.password === formData.password) {
            target.reset();
            setLocalSotrage("curUser", user);
            setData(user);
            navigate("/");
        }
    }
    handleError(true);
}

const handleDelete = (delEmail, setUsers) => {
    setUsers(prev => {
        const filteredUsers = prev.filter(curValue => curValue.email !== delEmail);
        setLocalSotrage("users", filteredUsers);
        return filteredUsers;
    })
}

export { register, authorization, handleDelete };