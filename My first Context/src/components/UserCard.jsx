import { handleDelete } from "../utils/handlerFunctions";

const UserCard = ({ userInfo, delButton, setUsers }) => {
    return (
        <div className="card-div">
            <div className="card-content">
                <p><b>Username: </b>{userInfo.username}</p>
                <p><b>Email: </b>{userInfo.email}</p>
                <p><b>Password: </b>{userInfo.password}</p>
                <div className="btn-div">
                    {
                        delButton && <button onClick={() => handleDelete(userInfo.email, setUsers)}>Delete</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserCard;