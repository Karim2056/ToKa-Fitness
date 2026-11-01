import { Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import About from "./pages/About/About";
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Meals from "./pages/Meals/Meals";
import Workouts from "./pages/Workouts/Workouts";
import Socials from "./pages/Socials/Socials";
import Settings from "./pages/Settings/Settings";
import TOS from "./pages/TOS/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

export default function Pages() {
    // 💡 Track login status reactively using state + localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedin") === "true"
    );

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(localStorage.getItem("loggedin") === "true");
        };

        // Listen for login/logout changes
        window.addEventListener("authChange", checkAuth);
        return () => window.removeEventListener("authChange", checkAuth);
    }, []);

    return (
        <Routes>
            {/* Root path: Dynamically switches based on reactive login state */}
            <Route 
                path="/" 
                element={isLoggedIn ? <Navigate to="/home" replace /> : <About />} 
            />

            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="meals" element={<Meals />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="socials" element={<Socials />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tos" element={<TOS />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
    );
}