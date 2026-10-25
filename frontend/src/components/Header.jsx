import {Link, useLocation} from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { Bell } from "lucide-react"; // Reemplazo del emoji por un ícono SVG
import imgUser from "../assets/user-img.jpg";
import "../styles/Header.css";
import { useState } from "react";

function Header() {
    const { persona } = useAuth();
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const titulosPorRuta = {
        "/": "Dashboard",
        "/dashboard": "Dashboard",
        "/perfil": "Mi Perfil",
        "/rutinas": "Mis Rutinas",
        "/ejercicios": "Mis Ejercicios",
    };

    let tituloActual = titulosPorRuta[location.pathname];
    if (!tituloActual) {
        if (location.pathname.startsWith("/rutinas/")) {
            tituloActual = "Detalle de Rutina";
        } else if (location.pathname.startsWith("/entrenamiento/")) {
            tituloActual = "Entrenamiento en curso";
        } else {
            tituloActual = "Limitless";
        }
    }

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

            <div className="topbar-left">
                <h1>{tituloActual}</h1>
                <p>{fechaMayus}</p>
            </div>

            {/* Bloque Derecho: Perfil y Notificaciones */}
            <div className="topbar-right">
                <div className="notifications-wrapper">
                    <button
                        className="bell-button"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {/* Podés hacer esto dinámico después */}
                        <span className="notification-dot"></span>
                    </button>

                    {/* EL PANEL DESPLEGABLE */}
                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <div className="notif-header">
                                <h3>Notificaciones</h3>
                                <button className="mark-read-btn">Marcar leídas</button>
                            </div>

                            <div className="notif-list">
                                {/* Notificación de Progresión (No leída) */}
                                <div className="notif-item unread">
                                    <div className="notif-icon progress">🏆</div>
                                    <div className="notif-content">
                                        <p>¡Nuevo Récord Personal!</p>
                                        <span>Alcanzaste 80kg en Press de Banca.</span>
                                        <small>Hace 2 horas</small>
                                    </div>
                                </div>

                                {/* Notificación de Sistema (Leída) */}
                                <div className="notif-item">
                                    <div className="notif-icon system">🚀</div>
                                    <div className="notif-content">
                                        <p>Bienvenido a Limitless</p>
                                        <span>Creá tu primera rutina para empezar.</span>
                                        <small>Hace 2 días</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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