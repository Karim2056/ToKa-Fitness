import "./Header.css"
import { NavLink, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import Menu from "../../assets/burger-menu-svgrepo-com (1).svg"



export default function Header() {

    
    // State to track login status reactively
    const [loggedin, setloggedin] = useState(localStorage.getItem("loggedin") === "true");

    useEffect(() => {
        // Function to update state when auth changes
        const checkAuth = () => {
            setloggedin(localStorage.getItem("loggedin") === "true");
        };

        // Listen for our custom event
        window.addEventListener("authChange", checkAuth);

        // Cleanup listener on unmount
        return () => window.removeEventListener("authChange", checkAuth);
    }, []);

    
    if (loggedin) {
        return(
            <div className="header">
            <NavLink to="/home">
                <button className="title">
                    <h1 style={{ lineHeight: 1 }}>ToKa Fitness</h1>
                </button>
            </NavLink>
            <NavLink to="/home">
                <button className="profile-btn">
                    profile
                </button>
            </NavLink>
        </div>
        )
    }

    return (
        <div className="header">
            <NavLink to="/">
                <button className="title">
                    <h1 style={{ lineHeight: 1 }}>ToKa Fitness</h1>
                </button>
            </NavLink>

            {/* buttons so header items are clickable */}

            <div className="header-container">
                <NavLink to="/signup" className="signup">
                    <button className="sign-up">
                        Sign Up
                    </button>
                </NavLink>
                <NavLink to="/login" className="login">
                    <button className="log-in">
                        Login
                    </button>
                </NavLink>
                <button className="menu">
                    <img className="menu-icon" src={Menu}></img>
                </button>
            </div>
        </div>
    )
}