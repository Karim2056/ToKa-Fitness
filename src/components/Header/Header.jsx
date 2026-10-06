import "./Header.css"
import { NavLink } from "react-router"
import Menu from "../../assets/burger-menu-svgrepo-com (1).svg"

export default function Header() {
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
                <NavLink to="login" className="login">
                    <button className="log-in">
                        Log In
                    </button>
                </NavLink>
                <button className="menu">
                    <img className="menu-icon" src={Menu}></img>
                </button>
            </div>
        </div>
    )
}