import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:1337/api/user", formData);
            console.log(response);
            navigate("/login");
        } catch(error) {
            console.log(error);
            setError("Failed to register, please try again.");
        }
    }

    return <>
    <form onSubmit={handleSubmit}>
        <input
            type="text" 
            name="name"
            placeholder="Enter full name"
            onChange={handleChange}
            value={formData.name}
        />
        <input 
            type="email" 
            name="email"
            placeholder="Enter email address"
            onChange={handleChange}
            value={formData.email}
        />    
        <input
            type="password"
            name="password"
            placeholder="Enter secure password"
            onChange={handleChange}
            value={formData.password}
        />
        <button type="submit">Submit</button>
    </form>
    { error && <p>error</p> }
    </>
}

export default RegisterForm;