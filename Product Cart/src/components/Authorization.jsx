import { Link } from "react-router-dom";
import { authorization } from "../utils/handlerFunctions.js";
import { useError } from "../hooks/useError.js";

const Authorization = ({ setCurUserForm }) => {
    const [isError, handleError] = useError();

    return (
        <div className="form-div">
            <h1>Authorization</h1>
            <form onSubmit={(e) => setCurUserForm(e, authorization, handleError)}>
                <div className="input-div">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" required />
                </div>
                <button>Authorize</button>
                <p>Don't have an account? <Link to="/register">Register</Link> </p>
            </form>
            <p id="error-message">{isError ? "User not found!" : ""}</p>
        </div>
    );
}

export default Authorization;