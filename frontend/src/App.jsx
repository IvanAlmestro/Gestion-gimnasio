import { useState } from 'react'
import './styles/App.css'
import axios from "axios"
import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Navbar from "./components/Navbar.jsx";
import RutinasPage from "./pages/RutinasPage.jsx";




function App() {
    const token = localStorage.getItem("token");

    return (
        <div className="page">

            {token && <Navbar/> }

            <Routes>
                <Route
                    path="/login" element={<LoginPage />}
                />
                <Route
                    path="/dashboard" element={token ? <DashboardPage/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/rutinas" element={token ? <RutinasPage/> : <Navigate to="/login"/>}
                />
            </Routes>

        </div>
    )
}

export default App