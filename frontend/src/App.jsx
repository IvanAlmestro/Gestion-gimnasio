import {Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider, useAuth} from "./hooks/useAuth.jsx";

import './styles/App.css';
import AppLayout from "./layouts/AppLayout.jsx"

// Páginas
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RoutinesPage from "./pages/RoutinesPage.jsx";
import RoutineDetailPage from "./pages/RoutineDetailPage.jsx";
import ActiveWorkoutPage from "./pages/ActiveWorkoutPage.jsx";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import PerfilPage from "./pages/ProfilePage.jsx";

// Extraer la lógica al hook global
function ProtectedRoute({ children }) {
    // Leemos el estado desde el hook, aislando a la vista de dónde sale el dato
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Redirección por defecto */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Rutas Públicas */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas Privadas envueltas en el Layout */}
                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/rutinas" element={<RoutinesPage />} />
                    <Route path="/rutinas/:id" element={<RoutineDetailPage />} />
                    <Route path="/entrenamiento/:rutinaId/dia/:diaId" element={<ActiveWorkoutPage />} />
                    <Route path="/ejercicios" element={<ExercisesPage />} />
                    <Route path="/perfil" element={<PerfilPage />} />

                </Route>

                {/* Ruta Catch-all (404) */}
                <Route
                    path="*"
                    element={
                        <div style={{ textAlign: "center", marginTop: "50px" }}>
                            <h1>404 - Página no encontrada</h1>
                            <p>La ruta que buscás no existe.</p>
                        </div>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;