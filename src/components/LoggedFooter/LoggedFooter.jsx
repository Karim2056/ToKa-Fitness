import "./LoggedFooter.css"
import { NavLink } from "react-router"

export default function LoggedFooter() {

    return (
        <div className="footer">
            <div className="footer-contents">
                <NavLink to="/home">
                    <button className="home-btn">home</button>
                </NavLink>
                <NavLink to="/home">
                    <button className="home-btn">meals</button>
                </NavLink>
                <NavLink to="/home">
                    <button className="home-btn">workouts</button>
                </NavLink>
                <NavLink to="/home">
                    <button className="home-btn">socials</button>
                </NavLink>
                <NavLink to="/home">
                    <button className="home-btn">settings</button>
                </NavLink>
            </div>
        </div>
    )
}