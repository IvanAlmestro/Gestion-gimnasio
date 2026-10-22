import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/LoginPage.css"; // Usa exactamente tu nuevo CSS

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [pesoInicial, setPesoInicial] = useState("");

    const navigate = useNavigate();
    const { register, loading, error } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !email || !password || !pesoInicial) return;
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        const success = await register(nombre, apellido, email, password, pesoInicial);

        if (success) {
            setMensajeExito("¡Registro exitoso! Redirigiendo...");
            setTimeout(() => navigate("/login"), 1500);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1 className="limitless-logo login-logo">
                        LIMIT<span>LESS</span>
                    </h1>
                    <p className="login-subtitle">Creá tu cuenta para empezar</p>
                </div>

                <form className="login-form" onSubmit={handleRegister}>

                    {/* Fila agrupada para Nombre y Apellido */}
                    <div style={{ display: "flex", gap: "16px" }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Ej: Iván"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Apellido</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Ej: Almestro"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Peso Inicial (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="form-input"
                            placeholder="Ej: 68.5"
                            value={pesoInicial}
                            onChange={(e) => setPesoInicial(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {/* Mensajes de feedback integrados */}
                    {error && <p className="error-message">{error}</p>}
                    {mensajeExito && <p className="success-message">{mensajeExito}</p>}

                    <button
                        type="submit"
                        className="primary-button login-btn"
                        disabled={loading}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                    >
                        {loading ? (
                            <>
                                <span className="button-spinner"></span>
                                Registrando...
                            </>
                        ) : (
                            "Registrarse"
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>¿Ya tenés cuenta? <Link to="/login" className="text-link">Iniciar sesión</Link></p>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;