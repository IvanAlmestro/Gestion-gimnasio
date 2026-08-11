import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validación temprana frontend (evita peticiones innecesarias a la BD)
        if (!email || !password) return;

        await login(email, password);
    };

    return (
        <section className="login-page">
            <form className="login-container" onSubmit={handleLogin}>
                <h1>Limitless</h1>
                <h2>Potenciá tus entrenamientos</h2>

                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-login"
                    required
                />

                <input
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-login"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>

                {error && <p className="login-message error">{error}</p>}

                <Link className="login-link" to="/register">
                    ¿No tenés cuenta? Registrate
                </Link>
            </form>
        </section>
    );
}

export default LoginPage;