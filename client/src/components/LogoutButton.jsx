import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton({ updateLoginStatus }) {
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            const response = await axios.post("http://localhost:1337/api/user/logout", {}, {
                withCredentials: true,
            });
            console.log(response);
            updateLoginStatus(false);
            navigate("/login");
        } catch(error) {
            console.error(error);
        }
    }
    return <button className="logout-btn" onClick={handleLogout}>Logout</button>
}

export default LogoutButton;