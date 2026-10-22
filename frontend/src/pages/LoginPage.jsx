import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import "../styles/LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validación temprana frontend
        if (!email || !password) return;

        await login(email, password);
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1 className="limitless-logo login-logo">
                        LIMIT<span>LESS</span>
                    </h1>
                    <p className="login-subtitle">Potenciá tus entrenamientos</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Mensaje de error integrado al nuevo diseño */}
                    {error && <p className="error-message">{error}</p>}

                    <button
                        type="submit"
                        className="primary-button login-btn"
                        disabled={loading}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                    >
                        {loading ? (
                            <>
                                <span className="button-spinner"></span>
                                Ingresando...
                            </>
                        ) : (
                            "Ingresar"
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>¿No tenés cuenta? <Link to="/register" className="text-link">Registrate</Link></p>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;