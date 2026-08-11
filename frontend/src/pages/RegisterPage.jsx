import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/LoginPage.css";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    const navigate = useNavigate();
    const { register, loading, error } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        // 1. Validación Frontend estricta
        if (!nombre || !apellido || !email || !password) return;
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres"); // A futuro cambiamos por un toast
            return;
        }

        // 2. Llamada limpia a la lógica de negocio
        const success = await register(nombre, apellido, email, password);

        if (success) {
            setMensajeExito("¡Registro exitoso! Redirigiendo...");
            setTimeout(() => navigate("/login"), 1500); // Pequeña pausa para que vea el mensaje
        }
    };

    return (
        <section className="login-page">
            <form className="login-container register-container" onSubmit={handleRegister}>
                <h1>Limitless</h1>
                <h2>Potenciá tus entrenamientos</h2>

                <label>Nombre</label>
                <input
                    placeholder="Ej: Ivan"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="input-login"
                    required
                />

                <label>Apellido</label>
                <input
                    placeholder="Ej: Suarez"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="input-login"
                    required
                />

                <label>Email</label>
                <input
                    placeholder="Ej: ivan@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-login"
                    required
                />

                <label>Contraseña</label>
                <input
                    placeholder="Minimo 6 caracteres"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-login"
                    required
                    minLength={6}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>

                {/* Manejo de feedback al usuario */}
                {error && <p className="login-message error">{error}</p>}
                {mensajeExito && <p className="login-message success">{mensajeExito}</p>}

                <Link className="login-link" to="/login">¿Ya tenés cuenta? Iniciar sesión</Link>
            </form>
        </section>
    );
}

export default RegisterPage;