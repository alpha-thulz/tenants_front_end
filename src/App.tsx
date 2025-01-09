import { AppNav } from "./components/AppNav.tsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Building from "./pages/Building.tsx";

export default function App() {
    return (
        <>
            <AppNav />
            <Routes>
                <Route path="/:id" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="user/:user_id/building/:building_id" element={<Building />} />
            </Routes>
        </>
    );
}