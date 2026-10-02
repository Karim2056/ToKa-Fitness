import { Routes, Route } from "react-router";
import About from "./pages/About/About"

export default function Pages() {
    return (
        <Routes>
            <Route index element={<About/>} />
        </Routes>
    )
}