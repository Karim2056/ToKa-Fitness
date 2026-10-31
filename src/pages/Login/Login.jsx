import "./Login.css"
import { NavLink, useNavigate } from "react-router"
import { useState } from "react"
import BackArrow from "../../assets/back-svgrepo-com.svg"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import axios from "axios"


export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // all account data in one object
        const loginData = {
            username: username,
            password: password,
        }

        // send the data to fastapi
        axios.post("http://127.0.0.1:8001/auth/login", loginData)
            .then(response => {
                console.log("logged in:", response.data);
                navigate("/home")
            })
            .catch(error => {   // fastapi errors come back as strings
                const detail = error.response?.data?.detail || "an error occured";
                let errorMessage = "an error occured";

                if (Array.isArray(detail) && detail.length > 0) {
                    // if theres a validation error in detail array
                    // take a field name that failed:
                    const err = detail[0];
                    const fieldName = err.loc[err.loc.length - 1];

                    // all custom messages:
                    const customMessages = {
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
            <Header />
            <div className="login-body">
                <form onSubmit={handleSubmit}>
                    <h1 className="sign-up-title">
                        <NavLink className="back-arrow-login" to="/">
                            <img className="back-arrow-login" src={BackArrow} />
                        </NavLink>
                        Login
                    </h1>
                    <div className="input-container">
                        <input className="form-inputs" placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <input className="form-inputs" type="password" placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-btn">Login</button>
                    <NavLink className="page-switch" to="/signup">Don't have an account? Sign Up</NavLink>

                </form>
            </div>
            <Footer />
        </>
    )
}