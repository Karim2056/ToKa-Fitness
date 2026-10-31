import "./Footer.css"
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function Footer() {

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

    return (
        <div className="footer">
            <div className="contacts">
                <a href="https://accounts.google.com/v3/signin/identifier?continue=https://mail.google.com/mail/u/0/&emr=1&followup=https://mail.google.com/mail/u/0/&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-737250080:1790868727487198">contact us:</a>
                <a href="https://accounts.google.com/v3/signin/identifier?continue=https://mail.google.com/mail/u/0/&emr=1&followup=https://mail.google.com/mail/u/0/&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-737250080:1790868727487198">tokafitness@gmail.com</a>
            </div>
            <div className="tos-privacypolicy">
                <a href="/">Terms of Service</a>
                <a href="/">Privacy Policy</a>
            </div>
        </div>
    )
}