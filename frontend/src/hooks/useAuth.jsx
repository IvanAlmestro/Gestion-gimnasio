import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // Inicializamos con lo que hay en localStorage para que la pantalla no titile
    const [persona, setPersona] = useState(() => {
        const data = localStorage.getItem("persona");
        return data ? JSON.parse(data) : null;
    });

    const actualizarPersonaLocal = (nuevosDatos) => {
        setPersona(nuevosDatos);
        localStorage.setItem("persona", JSON.stringify(nuevosDatos));
    };

    // 1. NUEVA FUNCIÓN: Para limpiar todo si el token muere o el usuario sale manual
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("persona");
        localStorage.removeItem("idUsuarioLogueado");
        setPersona(null);
        navigate("/login"); // o "/" dependiendo de tus rutas
    };

    // 2. NUEVO EFECTO: Valida la sesión en segundo plano al abrir la app
    useEffect(() => {
        const verificarSesion = async () => {
            const userId = localStorage.getItem("idUsuarioLogueado");

            if (token && userId) {
                try {
                    // Le pedimos al backend los datos más recientes del usuario.
                    // Si el token expiró, esto va a fallar y saltar al catch.
                    const response = await authApi.get(`/personas/${userId}`);
                    actualizarPersonaLocal(response.data);
                } catch (err) {
                    console.error("La sesión expiró o el token es inválido.");
                    logout(); // Deslogueo automático por seguridad
                }
            }
        };

        verificarSesion();
    }, []); // Se ejecuta solo una vez al cargar la app

    const login = async (email, password) => {
        setLoading(true);
        setError("");
        try {
            const response = await authApi.post("/personas/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));
            localStorage.setItem("idUsuarioLogueado", response.data.perfil.id);

            setPersona(response.data.perfil); // Actualizamos el estado al instante
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

    return (
        <AuthContext.Provider value={{ login, register, logout, loading, error, persona, token, setPersona: actualizarPersonaLocal }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};