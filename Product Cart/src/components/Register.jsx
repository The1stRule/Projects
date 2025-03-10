import { Link } from "react-router-dom";
import { register } from "../utils/handlerFunctions.js";
import { useError } from "../hooks/useError.js";

const Register = ({ setUsersForm }) => {
    const [isError, handleError] = useError();

    return (
        <div className="form-div">
            <h1>Register</h1>
            <form  onSubmit={(e) => setUsersForm(e, register, handleError)}>
                <div className="input-div">
                    <label htmlFor="fullname">Fullname:</label>
                    <input type="text" name="fullname" id="fullname" placeholder="Enter your fullname" required />
                </div>
                <div className="input-div">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" required />
                </div>
                <button>Register</button>
                <p>Already have an account? <Link to="/authorization">Authorization</Link> </p>
            </form>
            <p id="error-message">{isError ? "The email already exists!" : ""}</p>
        </div>
    );
}

export default Register;