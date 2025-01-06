import { useState } from 'react';

const Register = ({ useRegister }) => {

    const [usersList, setUsersList] = useRegister;
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        for(const user of usersList) {
            if(user.email === e.target.email.value) {
                setIsError(true)
                return;
            }
        }

        const newUser = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        setIsError(false);

        e.target.reset();

        setUsersList(prev => {
            console.log([...prev, newUser]);
            return [...prev, newUser];
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-div">
                    <label htmlFor="username"></label>
                    <input type="text" name="username" id="username" placeholder="Please enter your name" required />
                </div>
                <div className="input-div">
                    <label htmlFor="reg-email"></label>
                    <input type="email" name="email" id="reg-email" placeholder="Please enter your email" required />
                </div>
                <div className="input-div">
                    <label htmlFor="reg-pass"></label>
                    <input type="password" name="password" id="reg-pass" placeholder="Please enter your password" required />
                </div>
                <button>Sign up</button>
                <p>Already have an account? Sign In</p>
            </form>
            {
                isError ? <p style={{color: "red"}}>Email is already existed</p> : ""
            }
        </>
    );
}

export default Register;