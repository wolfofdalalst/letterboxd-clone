import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Dashboard({ isLogged, updateLogged }) {
    const [userData, setUserData] = useState(null);
    const [movieArray, setMovieArray] = useState([]);

    const config = { withCredentials: true }

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async() => {
            try {
                const profileResponse = await axios.get("http://localhost:1337/api/user/profile", config);
                setUserData(profileResponse.data);
                const movieResponse = await axios.get("http://localhost:1337/api/movie", config);
                setMovieArray(movieResponse.data);
                updateLogged(true);
            } catch(error) {
                updateLogged(false);
                console.error('error while getting profile data', error);
                navigate("/login");
            }
        };
        fetchData();
    }, [isLogged]);

    return (<>
        <h1>Welcome back, { userData === null ? "world" : userData.name }. Here's what we've been watching...</h1>
        { movieArray.map((movie) => (
            <MovieCard
                key={movie._id}
                name={movie.movieId}
                rating={movie._id}
                summary={movie.summary}
            />
        )) }
        <SearchBar />
        <LogoutButton updateLogged={updateLogged}/>
    </>);
}

export default Dashboard;