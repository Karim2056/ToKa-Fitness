import "./SignUp.css"
import { NavLink } from "react-router"
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import BackArrow from "../../assets/back-svgrepo-com.svg"

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        setErrorMsg("");

    }

    return (
        <>
            <Header />
            <div className="sign-up-body">
                <form>
                    <h1 className="sign-up-title">
                        <NavLink className="back-arrow" to="/">
                            <img className="back-arrow" src={BackArrow} />
                        </NavLink>
                        Sign Up
                    </h1>
                    <div className="input-container">
                        <input className="form-inputs" type="email" placeholder="email" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input className="form-inputs" placeholder="username" required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <input className="form-inputs" type="password" placeholder="password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="register-btn">Register</button>
                    <NavLink className="page-switch" to="/login">Already have an account? Login</NavLink>
                </form>
            </div>
            <Footer />
        </>
    )
}