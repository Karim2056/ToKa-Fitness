import { Routes, Route } from "react-router";
import About from "./pages/About/About";
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Meals from "./pages/Meals/Meals";
import Workouts from "./pages/Workouts/Workouts";
import Socials from "./pages/Socials/Socials";
import Settings from "./pages/Settings/Settings";

export default function Pages() {
    return (
        <Routes>
            <Route index element={<About/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="meals" element={<Meals/>}/>
            <Route path="workouts" element={<Workouts/>}/>
            <Route path="socials" element={<Socials/>}/>
            <Route path="settings" element={<Settings/>}/>
        </Routes>
    )
}