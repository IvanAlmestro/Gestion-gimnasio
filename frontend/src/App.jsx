import { useState } from 'react'
import './styles/index.css'
import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import MainLayout from "./components/MainLayout.jsx";

function App() {
    const token = localStorage.getItem("token");

    return (
        <Routes>
            <Route
                path="/login" 
                element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
            <Route
                path="/dashboard" 
                element={token ? <MainLayout initialView="dashboard" /> : <Navigate to="/login"/>}
            />
            <Route
                path="/rutinas" 
                element={token ? <MainLayout initialView="rutinas" /> : <Navigate to="/login"/>}
            />
            <Route
                path="/perfil" 
                element={token ? <MainLayout initialView="perfil" /> : <Navigate to="/login"/>}
            />
            <Route
                path="*" 
                element={<Navigate to={token ? "/dashboard" : "/login"} />}
            />
        </Routes>
    )
}

export default App
