import { useState } from 'react';

const Autorization = ({ usersList }) => {

    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        for(const user of usersList) {
            if(user.email === email && user.password === password) {
                console.log(user);
                e.target.reset();
                setIsError(false);
                return;
            }
        }

        
        setIsError(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-div">
                    <label htmlFor="log-email"></label>
                    <input type="email" name="email" id="log-email" placeholder="Please enter your email" required />
                </div>
                <div className="input-div">
                    <label htmlFor="log-pass"></label>
                    <input type="password" name="password" id="log-pass" placeholder="Please enter your password" required />
                </div>
                <button>Sign up</button>
                <p>Don't have an account? Sign up</p>
            </form>
            {
                isError ? <p style={{color: "red"}}>User not found</p> : ""
            }
        </>
    );
}

export default Autorization;