import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "../styles/LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/personas/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));

            setMensaje("Login exitoso");

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setMensaje("Credenciales inválidas");
        }
    };

    return (
        <section className="login-page">
            <form className="login-container" onSubmit={handleLogin}>
                <h1>OX SPORTS</h1>
                <h2>Potenciá tus entrenamientos</h2>

                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-login"
                />

                <input
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-login"
                />

                <button type="submit">Ingresar</button>

                {mensaje && <p className="login-message">{mensaje}</p>}

                <Link className="login-link" to="/register">
                    ¿No tenés cuenta? Registrate
                </Link>
            </form>
        </section>
    );
}

export default LoginPage;