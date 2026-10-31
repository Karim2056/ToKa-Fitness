import "./Settings.css"
import { useNavigate } from "react-router"

export default function Settings() {
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
                <button className="logout-btn" onClick={handlelogout}>
                    logout
                </button>
            </div>
        </>
    )
}