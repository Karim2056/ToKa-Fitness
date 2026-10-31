import "./LoggedFooter.css"
import { NavLink } from "react-router"

export default function LoggedFooter() {

    return (
        <div className="footer">
            <div className="footer-contents">
                <NavLink to="/home">
                    <button className="home-btn">home</button>
                </NavLink>
                <NavLink to="/meals">
                    <button className="meals-btn">meals</button>
                </NavLink>
                <NavLink to="/workouts">
                    <button className="workouts-btn">workouts</button>
                </NavLink>
                <NavLink to="/socials">
                    <button className="socials-btn">socials</button>
                </NavLink>
                <NavLink to="/settings">
                    <button className="settings-btn">settings</button>
                </NavLink>
            </div>
        </div>
    )
}