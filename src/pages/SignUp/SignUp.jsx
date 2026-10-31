import "./SignUp.css"
import { NavLink } from "react-router"
import { useState } from "react";
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
                alert("account created")
            })
            .catch(error => {       //goes through json files to find the error messages from backend
                const detail = error.response?.data?.detail;
                let errorMessage = "an error occured";

                if (Array.isArray(detail) && detail.length > 0) {
                    // if theres a validation error in detail array
                    // take a field name that failed:
                    const err = detail[0];
                    const fieldName = err.loc[err.loc.length - 1];

                    // all custom messages:
                    const customMessages = {
                        email: "Please enter a valid email address",
                        username: "Username should be between 2 and 20 characters long",
                        password: "Password should be at least 8 characters long"
                    }

                    // error message for any field error is used
                    // a default error message exists if not found
                    errorMessage = customMessages[fieldName] || `please check your ${fieldName}`;

                } else if (typeof detail === "string") {
                    // httpexception error messages from backend
                    errorMessage = detail;
                }

                console.error("signup failed", errorMessage);
                alert(errorMessage);
            });
    }

    return (
        <>
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
        </>
    )
}