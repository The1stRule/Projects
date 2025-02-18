import { useForm } from "./hooks/useForm";
import { useToggle } from "./hooks/useToggle";
import ChangeMode from "./components/ChangeMode";
import SearchUser from "./components/SearchUser";
import UserCard from "./components/UserCard";

const App = () => {
    const [data, isError, handleSubmit] = useForm();
    const [toggle, handleToggle] = useToggle();

    return (
        <div style={{ backgroundColor: toggle? "#141c2f" : "#f5f8ff" }} id="body-div">
            <main>
                <ChangeMode toggle={toggle} handleToggle={handleToggle} />
                <SearchUser handleSubmit={handleSubmit} toggle={toggle} isError={isError} />
                <UserCard data={data} toggle={toggle} />
            </main>
        </div>
    );
}

export default App;