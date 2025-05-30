import { useContext } from "react";
import { AuthContext } from "./Components/context/context";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("setIsLoggedIn");
        navigate("/");
    };

    return (
        <span onClick={handleLogout} className="Nav-item" style={{ cursor: "pointer" }}>
            Logout
        </span>
    );
}
