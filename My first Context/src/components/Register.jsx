import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";
import { register } from "../utils/handlerFunctions.js";
import { useError } from "../hooks/isError.js";

const Register = () => {
    const { setUsers, handleSubmit, navigate } = useContext(AuthContext);
    const [isError, handleError] = useError();

    return (
        <div className="form-div">
            <h1>Register</h1>
            <form onSubmit={(e) => handleSubmit(e, register, setUsers, navigate, handleError)}>
                <input type="text" name="username" placeholder="Enter your username" required />
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <button>Register</button>
                <p>Already have account? <Link to="/authorization">Authorization</Link></p>
            </form>
            <p id="error-message">{isError ? "The email already exists!" : ""}</p>
        </div>
    );
}

export default Register;