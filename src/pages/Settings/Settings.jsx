import "./Settings.css"
import { NavLink, useNavigate } from "react-router"
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export default function Settings() {

    // 5 modals to be used
    let [ismodal1open, setismodal1open] = useState(false)
    let [ismodal2open, setismodal2open] = useState(false)
    let [ismodal3open, setismodal3open] = useState(false)
    let [ismodal5open, setismodal5open] = useState(false)


    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.removeItem("loggedin");
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
    };

    const [ttsEnabled, setTtsEnabled] = useState(
        localStorage.getItem("tts_enabled") === "true"
    );

    const speakText = (text) => {    //if tts being used, cancel the previous tts and speak what was told now
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

    return (
        <>
            <div className="settings-body">

                {/* accessibility */}
                <button className="settings-page-btn" onClick={() => setismodal1open(true)}>
                    <h2>Accessibility</h2>
                </button>
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

                {/* profile */}
                <button className="settings-page-btn" onClick={() => setismodal2open(true)}>
                    <h2>Profile Settings</h2>
                </button>
                <Modal isopen={ismodal2open} onclose={() => setismodal2open(false)}>
                    <h1>Profile Settings</h1>
                    <button className="logout-btn" onClick={handlelogout}>
                        logout
                    </button>

                </Modal>

                {/* managage subscription */}
                <button className="settings-page-btn" onClick={() => setismodal3open(true)}>
                    <h2>Manage Subscription</h2>
                </button>
                <Modal isopen={ismodal3open} onclose={() => setismodal3open(false)}>
                    <h1>Manage Subscription</h1>
                    no subscriptions available. this is a prototype website.
                </Modal>

                {/* about us */}
                <NavLink to="/about">
                    <button className="settings-page-btn">
                        <h2>About Us</h2>
                    </button>
                </NavLink>


                {/* contact us */}
                <button className="settings-page-btn" onClick={() => setismodal5open(true)}>
                    <h2>Contact Us</h2>
                </button>
                <Modal isopen={ismodal5open} onclose={() => setismodal5open(false)}>
                    <div className="contact-us">
                        <h1>Contact Us</h1>
                        <a href="https://accounts.google.com/v3/signin/identifier?continue=https://mail.google.com/mail/u/0/&emr=1&followup=https://mail.google.com/mail/u/0/&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-737250080:1790868727487198">email: tokafitness@gmail.com</a>
                        <NavLink to="/tos">Terms of Service</NavLink>
                        <NavLink to="/privacypolicy">Privacy Policy</NavLink>
                    </div>
                </Modal>

            </div>
        </>
    )
}