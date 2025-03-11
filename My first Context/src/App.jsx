import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel.jsx";
import Register from "./components/Register.jsx";
import Authorization from "./components/Authorization.jsx";
import ProtectedRote from "./components/ProtectedRote.jsx";

const App = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={
                    <ProtectedRote>
                        <AdminPanel />
                    </ProtectedRote>
                } />
                <Route path="/register" element={<Register />} />
                <Route path="/authorization" element={<Authorization />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </main>
    );
}

export default App;