import "./SignUp.css"

export default function SignUp() {
    return (
        <div className="sign-up-body">
            <form>
                <h1 className="sign-up-title">
                    Sign Up
                </h1>
                <div className="input-container">
                    <input className="form-inputs" type="email" placeholder="email" />
                    <input className="form-inputs" placeholder="username" />
                    <input className="form-inputs" type="password" placeholder="password" />
                </div>
                <button className="register-btn">Register</button>
            </form>
        </div>
    )
}