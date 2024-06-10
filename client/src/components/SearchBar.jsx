import { useEffect, useState } from "react";
import axios from "axios";

function SearchBar() {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // array that contains the suggestions
                const { data } = await axios.get("http://localhost:1337/api/movie/suggestion?search=" + value, { withCredentials: true });
                setSuggestions(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [value]);

    return (
        <>
            <input
                type="text"
                placeholder="Search for movie..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            {
                suggestions.map((movie, index) => (
                    <p key={index}>{ movie.original_title } ({new Date(movie.release_date).getFullYear()})</p> 
                ))
            }
        </>
    );
}

export default SearchBar;