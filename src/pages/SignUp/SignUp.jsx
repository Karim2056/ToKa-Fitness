import { NavLink } from "react-router"
import "./SignUp.css"
import BackArrow from "../../assets/back-svgrepo-com.svg"

export default function SignUp() {
    return (
        <div className="sign-up-body">
            <form>
                <h1 className="sign-up-title">
                    <NavLink className="back-arrow" to="/">
                        <img className="back-arrow" src={BackArrow} />
                    </NavLink>
                    Sign Up
                </h1>
                <div className="input-container">
                    <input className="form-inputs" type="email" placeholder="email" />
                    <input className="form-inputs" placeholder="username" />
                    <input className="form-inputs" type="password" placeholder="password" />
                </div>
                <button className="register-btn">Register</button>
                <NavLink className="page-switch" to="/login">Already have an account? Login</NavLink>
            </form>
        </div>
    )
}