import { Link } from "react-router-dom";
import logo from "../assets/letterboxd-logo.png"
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

function Navbar({ loginStatus, updateLoginStatus }) {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="letterboxd-logo" />
                <Link to="/">Letterboxd</Link>
            </div>
            {!loginStatus && (
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
            {loginStatus && <LogoutButton updateLoginStatus={updateLoginStatus} /> }
        </div>
    );
}

export default Navbar;