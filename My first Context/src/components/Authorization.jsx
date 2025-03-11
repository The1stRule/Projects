import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { authorization } from "../utils/handlerFunctions";
import { useError } from "../hooks/isError";

const Authorization = () => {
    const { setCurUser, handleSubmit, navigate } = useContext(AuthContext);
    const [isError, handleError] = useError();

    return (
        <div className="form-div">
            <h1>Authorization</h1>
            <form onSubmit={(e) => handleSubmit(e, authorization, setCurUser, navigate, handleError)}>
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <button>Register</button>
                <p>Don't have account? <Link to="/register">Register</Link></p>
            </form>
            <p id="error-message">{isError ? "User not found!" : ""}</p>
        </div>
    );
}

export default Authorization;