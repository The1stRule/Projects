import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";

const ProtectedRote = ({ children }) => {
    const { curUser } = useContext(AuthContext);
    if(Object.keys(curUser).length === 0) {
        return <Navigate to="/authorization" />;
    }

    return children;
}

export default ProtectedRote;