import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

// 1. Creamos el "parlante" global
const AuthContext = createContext();

// 2. Creamos el Provider (el componente que va a envolver tu app)
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const [persona, setPersona] = useState(() => {
        const data = localStorage.getItem("persona");
        return data ? JSON.parse(data) : null;
    });

    const actualizarPersonaLocal = (nuevosDatos) => {
        setPersona(nuevosDatos);
        localStorage.setItem("persona", JSON.stringify(nuevosDatos));
    };

    const login = async (email, password) => {
        // ... tu código de login queda exactamente igual ...
        setLoading(true);
        setError("");
        try {
            const response = await authApi.post("/personas/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));
            localStorage.setItem("idUsuarioLogueado", response.data.perfil.id);
            navigate("/dashboard");
        } catch (err) {
            setError("Credenciales inválidas. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const register = async (nombre, apellido, email, password, pesoFormulario) => {
        setLoading(true);
        setError("");

        try {
            await authApi.post("/personas/register", {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                pesoInicial: pesoFormulario
            });
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar el usuario");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Acá inyectamos las variables al parlante para que todos las escuchen
    return (
        <AuthContext.Provider value={{ login, register, loading, error, persona, token, setPersona: actualizarPersonaLocal }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Tu hook ahora simplemente "escucha" al parlante en vez de crear copias nuevas
export const useAuth = () => {
    return useContext(AuthContext);
};