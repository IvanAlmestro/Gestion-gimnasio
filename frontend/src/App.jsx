import { useState } from 'react'
import './styles/App.css'
import axios from "axios"
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Navbar from "./components/Navbar.jsx";
import RutinasPage from "./pages/RutinasPage.jsx";

function App() {



    return (
        <div className="page">

            <Navbar />

            <Routes>
                <Route
                    path="/login" element={<LoginPage />}
                />
                <Route
                    path="/dashboard" element={<DashboardPage/>}
                />
                <Route
                    path="/rutinas" element={<RutinasPage />}
                />
            </Routes>

        </div>
    )
}

export default App