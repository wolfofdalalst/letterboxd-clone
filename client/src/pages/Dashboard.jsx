import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:1337/api/user/profile", {
                    withCredentials: true,
                });
                setData(response.data);
            } catch(error) {
                console.error('error while getting profile data', error);
                navigate("/login");
            }
        };
        fetchData();
    }, []);

    return (<>
        <h1>Hello { data === null ? "world" : data.name }</h1>
        <LogoutButton />
    </>);
}

export default Dashboard;