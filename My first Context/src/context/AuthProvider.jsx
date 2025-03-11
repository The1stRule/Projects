import { createContext, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm.js";
import { getLocalSotrage, setLocalSotrage } from "../utils/localStorage.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(getLocalSotrage("users") || []);
    const [curUser, setCurUser] = useState(getLocalSotrage("curUser") || {});
    const handleSubmit = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        !getLocalSotrage("users") && setLocalSotrage("users", []);
        !getLocalSotrage("curUser") && setLocalSotrage("curUser", {});
    }, [])

    return (
        <AuthContext.Provider value={{ users, setUsers, curUser, setCurUser, handleSubmit, navigate }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;