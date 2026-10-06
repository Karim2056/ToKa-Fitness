import { Routes, Route } from "react-router";
import About from "./pages/About/About"
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login";

export default function Pages() {
    return (
        <Routes>
            <Route index element={<About/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="login" element={<Login/>}/>
        </Routes>
    )
}