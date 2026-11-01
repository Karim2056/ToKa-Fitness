import "./Header.css"
import { NavLink, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import Menu from "../../assets/burger-menu-svgrepo-com (1).svg"
import Modal from "../Modal/Modal";

export default function Header() {

    let [ismodal1open, setismodal1open] = useState(false); // Accessibility modal state
    let [isMenuOpen, setIsMenuOpen] = useState(false);     // Slide-out menu state

    const [ttsEnabled, setTtsEnabled] = useState(
        localStorage.getItem("tts_enabled") === "true"
    );

    // tts functions
    const speakText = (text) => {
        if (window.responsiveVoice) {
            window.responsiveVoice.cancel();
            window.responsiveVoice.speak(text);
        } else if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeech = () => {
        if (window.responsiveVoice) {
            window.responsiveVoice.cancel();
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };

    const toggleTTS = () => {
        const newState = !ttsEnabled;
        setTtsEnabled(newState);
        localStorage.setItem("tts_enabled", newState);

        if (newState) {
            speakText("Screen reader enabled. Highlight any text to hear it.");
        } else {
            stopSpeech();
            speakText("Screen reader disabled.");
        }
    };

    // State to track login status reactively
    const [loggedin, setloggedin] = useState(localStorage.getItem("loggedin") === "true");

    useEffect(() => {
        const checkAuth = () => {
            setloggedin(localStorage.getItem("loggedin") === "true");
        };

        window.addEventListener("authChange", checkAuth);
        return () => window.removeEventListener("authChange", checkAuth);
    }, []);

    if (loggedin) {
        return (
            <div className="header2">
                <NavLink to="/home">
                    <button className="title">
                        <h1 style={{ lineHeight: 1 }}>ToKa Fitness</h1>
                    </button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className="header">
            <NavLink to="/">
                <button className="title">
                    <h1 style={{ lineHeight: 1 }}>ToKa Fitness</h1>
                </button>
            </NavLink>

            {/* buttons so header items are clickable */}
            <div className="header-container">
                <NavLink to="/signup" className="signup">
                    <button className="sign-up">
                        Sign Up
                    </button>
                </NavLink>
                <NavLink to="/login" className="login">
                    <button className="log-in">
                        Login
                    </button>
                </NavLink>
                <button className="menu" onClick={() => setIsMenuOpen(true)}>
                    <img className="menu-icon" src={Menu} alt="menu"></img>
                </button>
            </div>

            {/* Sliding Rectangle Drawer from the Right */}
            <div className={`side-drawer ${isMenuOpen ? "open" : ""}`}>
                <button className="close-drawer-btn" onClick={() => setIsMenuOpen(false)}>×</button>

                <div className="drawer-links">
                    <h2>Menu</h2>
                    <NavLink to="/" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>

                    {/* Public accessibility button inside the drawer */}
                    <button
                        className="drawer-accessibility-btn"
                        onClick={() => {
                            setIsMenuOpen(false);
                            setismodal1open(true);
                        }}
                    >
                        Accessibility Settings
                    </button>

                    {loggedin && (
                        <NavLink to="/settings" onClick={() => setIsMenuOpen(false)}>Settings</NavLink>
                    )}
                </div>
            </div>

            {/* Backdrop overlay when menu is open */}
            {isMenuOpen && <div className="drawer-backdrop" onClick={() => setIsMenuOpen(false)}></div>}

            {/* Accessibility Modal */}
            <Modal isopen={ismodal1open} onclose={() => setismodal1open(false)}>
                <div style={{ padding: "10px" }}>
                    <h1>Accessibility</h1>
                    <h3>Screen Reader Settings</h3>
                    <p>Enable text-to-speech to highlight and read any text on the screen.</p>

                    <button
                        onClick={toggleTTS}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: ttsEnabled ? "var(--green)" : "#ccc",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        {ttsEnabled ? "Screen Reader: ON" : "Screen Reader: OFF"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}