import "./SignUp.css"
import { NavLink } from "react-router"
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios"

import BackArrow from "../../assets/back-svgrepo-com.svg"

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tier, setTier] = useState("tier 1")

    function handleSubmit(e) {
        e.preventDefault();     // prevents page refresh when submitted
        
        // all account data in one object
        const signupData = {
            email: email,
            username: username,
            password: password,
            tier: tier
        }

        // send the object to fastapi
        axios.post("http://127.0.0.1:8001/auth/signup", signupData)
            .then(response => {
                console.log("account created:", response.data);
                alert("success! account created");
            })
            .catch(error => {
                const errorMessage = error.response?.data?.detail || "an error occured";
                console.error("signup failed", errorMessage);
                alert(errorMessage);
            });
    }

    return (
        <>
            <Header />
            <div className="sign-up-body">
                <form onSubmit={handleSubmit}> 
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
                    <div className="tier-button-container">
                        <div className="button">
                            tier 1
                            <input
                                className="tier"
                                type="radio"
                                name="tiers"
                                value="tier 1"
                                checked={tier === "tier 1"}
                                onChange={(e) => setTier(e.target.value)}
                            />
                        </div>
                        <div className="button">
                            tier 2
                            <input
                                className="tier"
                                type="radio"
                                name="tiers"
                                value="tier 2"
                                checked={tier === "tier 2"}
                                onChange={(e) => setTier(e.target.value)}
                            />
                        </div>
                        <div className="button">
                            tier 3
                            <input
                                className="tier"
                                type="radio"
                                name="tiers"
                                value="tier 3"
                                checked={tier === "tier 3"}
                                onChange={(e) => setTier(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="register-btn">Register</button>
                    <NavLink className="page-switch" to="/login">Already have an account? Login</NavLink>
                </form>
            </div>
            <Footer />
        </>
    )
}