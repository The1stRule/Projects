const SearchUser = ({ toggle, handleSubmit, isError }) => {
    return (
        <form style={{backgroundColor: toggle? "#1f2a48" : "#fefefc"}} onSubmit={handleSubmit}>
            <div id="input-div">
                <label htmlFor="username"><i className="fa-solid fa-magnifying-glass"></i></label>
                <input style={{ backgroundColor: toggle? "#1f2a48" : "#fefefc", color: toggle? "white" : "#474b4f"}}
                type="text" name="username" id="username" placeholder="Search Github username..." required />
            </div>
            <p id="error-message">{isError? "User not found" : ""}</p>
            <button>Search</button>
        </form>
    );
}

export default SearchUser;