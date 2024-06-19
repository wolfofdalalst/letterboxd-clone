import { Link } from "react-router-dom";
import logo from "../assets/letterboxd-logo.png"
import "./Navbar.css";

function Navbar({ isLogged }) {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="letterboxd-logo" />
                <Link to="/">Letterboxd</Link>
            </div>
            {!isLogged && (
                <div className="auth-panel">
                    <Link to="/login">SIGN IN</Link>
                    <Link to="/register">CREATE ACCOUNT</Link>
                </div>
            )
            }
            <div className="nav-links">
                <Link to="/films">FILMS</Link>
                <Link to="/lists">LISTS</Link>
                <Link to="/members">MEMBERS</Link>
                <Link to="/journal">JOURNAL</Link>
            </div>
        </div>
    );
}

export default Navbar;