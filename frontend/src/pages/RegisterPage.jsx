import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import "../styles/LoginPage.css";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/personas/register", {
                nombre,
                apellido,
                email,
                password
            });

            setMensaje("Registro exitoso");

            navigate("/login");
        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            console.log(error.response?.status);

            setMensaje("Error en el registro");
        }
    };

    return (
        <section className="login-page">
            <form className="login-container register-container" onSubmit={handleRegister}>
                <h1>OX SPORTS</h1>
                <h2>Potenciá tus entrenamientos</h2>

                <label>Nombre</label>
                <input
                    placeholder="Ej: Ivan"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label>Apellido</label>
                <input
                    placeholder="Ej: Suarez"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />

                <label>Email</label>
                <input
                    placeholder="Ej: ivan@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Contraseña</label>
                <input
                    placeholder="Minimo 6 caracteres"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Registrarse</button>

                {mensaje && <p className="login-message">{mensaje}</p>}

                <Link className="login-link" to="/login">
                    ¿Ya tenés cuenta? Iniciar sesión
                </Link>
            </form>
        </section>
    );
}

export default RegisterPage;