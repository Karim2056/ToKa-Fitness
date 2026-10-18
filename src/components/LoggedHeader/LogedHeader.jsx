import "./LoggedHeader.css"
import { NavLink } from "react-router"

export default function LoggedHeader() {
    return (
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