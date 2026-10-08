import "./Login.css"
import { NavLink } from "react-router"
import BackArrow from "../../assets/back-svgrepo-com.svg"

export default function Login() {
    return (
        <div className="login-body">
            <form>
                <h1 className="sign-up-title">
                    <NavLink className="back-arrow-login" to="/">
                        <img className="back-arrow-login" src={BackArrow} />
                    </NavLink>
                    Login
                </h1>
                <div className="input-container">
                    <input className="form-inputs" placeholder="username" />
                    <input className="form-inputs" type="password" placeholder="password" />
                </div>
                <button className="login-btn">Login</button>
                <NavLink className="page-switch" to="/signup">Don't have an account? Sign Up</NavLink>

            </form>
        </div>
    )
}