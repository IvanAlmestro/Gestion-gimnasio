import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { Bell } from "lucide-react"; // Reemplazo del emoji por un ícono SVG
import imgUser from "../assets/user-img.jpg";
import "../styles/Header.css";

function Header() {
    const { persona } = useAuth();

    const fechaActual = new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    const fechaMayus = fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1);

    // Obtenemos el nombre para reutilizarlo limpio
    const nombreUsuario = persona?.nombre || "Ivan";

    return (
        <header className="dashboard-topbar">
            {/* Bloque Izquierdo: Saludo y Fecha */}
            <div className="topbar-left">
                <h1>Hola, {nombreUsuario}</h1>
                <p>{fechaMayus}</p>
            </div>

            {/* Bloque Derecho: Perfil y Notificaciones */}
            <div className="topbar-right">
                <button className="bell-button">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>
                <div className="user-profile">
                    <Link to="/perfil">
                        <img
                            src={persona?.fotoPerfil || imgUser}
                            alt="Foto del usuario"
                            className="avatar"
                        />
                    </Link>
                    <div className="user-details">
                        <strong>{nombreUsuario}</strong>
                        <span>Alumno</span>
                    </div>
                </div>


            </div>
        </header>
    );
}

export default Header;