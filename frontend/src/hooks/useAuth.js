import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 1. Leemos los datos directamente del storage
    const token = localStorage.getItem("token");
    const [persona, setPersona] = useState(() => {
        const data = localStorage.getItem("persona");
        return data ? JSON.parse(data) : null;
    });
    const actualizarPersonaLocal = (nuevosDatos) => {
        setPersona(nuevosDatos); // Actualiza la pantalla (React)
        localStorage.setItem("persona", JSON.stringify(nuevosDatos)); // Actualiza el disco (Navegador)
    };
    const login = async (email, password) => {
        setLoading(true);
        setError("");

        try {
            const response = await authApi.post("/personas/login", { email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));
            // Extraemos el id de la respuesta
            const idUsuario = response.data.perfil.id;
            localStorage.setItem("idUsuarioLogueado", idUsuario);

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

    return { login, register, loading, error, persona, token , setPersona: actualizarPersonaLocal};
};