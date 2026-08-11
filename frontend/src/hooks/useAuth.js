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

    const login = async (email, password) => {
        setLoading(true);
        setError("");

        try {
            const response = await authApi.post("/personas/login", { email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));

            navigate("/dashboard");
        } catch (err) {
            setError("Credenciales inválidas. Por favor, intentá de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const register = async (nombre, apellido, email, password) => {
        setLoading(true);
        setError("");

        try {
            await authApi.post("/personas/register", { nombre, apellido, email, password });
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar el usuario");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 2. ¡ACÁ ESTABA EL ERROR! Ahora sí exportamos el token al final
    return { login, register, loading, error, persona, token };
};