import "./Settings.css"
import { NavLink, useNavigate } from "react-router"
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export default function Settings() {

    // 5 modals to be used
    let [ismodal1open, setismodal1open] = useState(false)
    let [ismodal2open, setismodal2open] = useState(false)
    let [ismodal3open, setismodal3open] = useState(false)
    let [ismodal4open, setismodal4open] = useState(false)
    let [ismodal5open, setismodal5open] = useState(false)

    const navigate = useNavigate();

    const handlelogout = () => {
        //clear storage
        localStorage.removeItem("loggedin");
        //update header and footer instantly
        window.dispatchEvent(new Event("authChange"));
        //take user to start page (about)
        navigate("/");
    }

    return (
        <>
            <div className="settings-body">

                {/* accessibility */}
                <button className="settings-page-btn" onClick={() => setismodal1open(true)}>
                    <h2>Accessibility</h2>
                </button>
                <Modal isopen={ismodal1open} onclose={() => setismodal1open(false)}>
                    hi
                </Modal>

                {/* profile */}
                <button className="settings-page-btn" onClick={() => setismodal2open(true)}>
                    <h2>Profile Settings</h2>
                </button>
                <Modal isopen={ismodal2open} onclose={() => setismodal2open(false)}>

                    <button className="logout-btn" onClick={handlelogout}>
                        logout
                    </button>

                </Modal>

                {/* managage subscription */}
                <button className="settings-page-btn" onClick={() => setismodal3open(true)}>
                    <h2>Manage Subscription</h2>
                </button>
                <Modal isopen={ismodal3open} onclose={() => setismodal3open(false)}>
                    no subscriptions available. this is a prototype website.
                </Modal>

                {/* about us */}
                <NavLink to="/">
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
                        <a href="https://accounts.google.com/v3/signin/identifier?continue=https://mail.google.com/mail/u/0/&emr=1&followup=https://mail.google.com/mail/u/0/&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-737250080:1790868727487198">email: tokafitness@gmail.com</a>
                        <a href="/">Terms of Service</a>
                        <a href="/">Privacy Policy</a>
                    </div>
                </Modal>

            </div>
        </>
    )
}