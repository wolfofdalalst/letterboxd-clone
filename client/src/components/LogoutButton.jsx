import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            const response = await axios.post("http://localhost:1337/api/user/logout", {}, {
                withCredentials: true,
            });
            console.log(response);
            navigate("/login");
        } catch(error) {
            console.error(error);
        }
    }
    return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton;