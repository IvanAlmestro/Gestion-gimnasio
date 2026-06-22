import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import api from "../services/api.js";

function RegisterPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [apellido,setApellido] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) =>{

        e.preventDefault();
        console.log(nombre);
        console.log(email);
        console.log(password);
        try{
            const response = await api.post("/personas/register", {
                nombre,
                apellido,
                email,
                password
            });
            console.log(response.data);
            setMensaje("Registro exitoso");

            navigate("/login");

        }catch(error){
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            console.log(error.response?.status);

            setMensaje("Error en el registro")
        }
    }

    return (

            <div className="login-container">
                <h2>Crear Cuenta</h2>

                <input
                    placeholder="nombre"
                    type="name"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    placeholder="apellido"
                    type="String"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
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
                <p>{mensaje}</p>
                <button onClick={handleRegister}>Registrarse</button>
            </div>

    )
}
export default RegisterPage;