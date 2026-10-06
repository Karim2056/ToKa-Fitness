import "./Login.css"
import { NavLink } from "react-router"

export default function Login() {
    return (
        <div className="login-body">
            <form>
                <h1 className="login-title">
                    Login
                </h1>
                <div className="input-container">
                    <input className="form-inputs" placeholder="username" />
                    <input className="form-inputs" type="password" placeholder="password" />
                </div>
                <button className="login-btn">Login</button>
                <NavLink className="page-switch" to="/signup">Already have an account? Login</NavLink>

            </form>
        </div>
    )
}