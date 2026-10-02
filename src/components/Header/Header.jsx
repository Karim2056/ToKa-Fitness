import "./Header.css"
import Settings from "../../assets/settings.svg"

export default function Header() {
    return (
        <div className="header">
            <button className="title">
                <h1 style={{ lineHeight: 1 }}>ToKa Fitness</h1>
            </button>

            {/* buttons so header items are clickable */}
            
            <div className="header-container">      
                <button className="sign-up">
                    Sign Up
                </button>
                <button className="log-in">
                    Log In
                </button>
                <button className="settings">
                    <img className="settings-icon" src={Settings}></img>
                </button>
            </div>
        </div>
    )
}