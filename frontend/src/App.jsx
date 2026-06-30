import { useState } from 'react'
import './styles/App.css'
import axios from "axios"
import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RoutinesPage from "./pages/RoutinesPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import ExercisesPage from "./pages/ExercisesPage.jsx";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/rutinas" element={<RoutinesPage />} />
                <Route path="/ejercicios" element={<ExercisesPage />} />
            </Route>
        </Routes>
    );
}

export default App