import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import UserCard from "./UserCard.jsx";

const AdminPanel = () => {
    const { users, setUsers, curUser, setCurUser } = useContext(AuthContext);
    return (
        <div id="admin-panel">
            <h1>Admin Panel</h1>
            <button onClick={() => setCurUser({})}>Log out</button>
            <h2>Current User</h2>
            <div>
                <UserCard userInfo={curUser} delButton={false} />
            </div>
            <hr />
            <h2>All Users</h2>
            <div>
                {
                    users.filter(user => user.email !== curUser.email).map((curValue, index) => {
                        return (
                            <UserCard key={index} userInfo={curValue} delButton={true} setUsers={setUsers} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default AdminPanel;