import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import api from "../services/api";
import "../styles/LoginPage.css"

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) =>{

        e.preventDefault();
        console.log(email);
        console.log(password);
        try{
            const response = await api.post("/personas/login", {
                email,
                password
            });
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("persona", JSON.stringify(response.data.perfil));
            setMensaje("Login exitoso");

            navigate("/dashboard");
            window.location.reload();
        }catch(error){
            console.log(error);

            setMensaje("Credenciales inválidas")
        }
    }

    return (
        <form onSubmit={handleLogin} >
            <div className="login-container">
                <h2>Ingrese sus datos</h2>
                <input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
                <p>{mensaje}</p>

                <span>¿Todavía no te registraste?</span>
                <a>Crear Cuenta</a>
            </div>
        </form>
    )
}

export default LoginPage;
