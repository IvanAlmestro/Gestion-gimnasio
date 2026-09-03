import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx"; // Traemos el hook global
import imgUser from "../assets/user-img.jpg";
import "../styles/Header.css";

function Header() {
    // 1. Usamos el estado global en vez del localStorage estático
    const { persona } = useAuth();

    const fechaActual = new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
    const fechaMayus = fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1);

    return (
        <header className="app-header">
            <div className="header-container">
                <p className="header-date">{fechaMayus}</p>

                <div className="header-user">
                    <div className="notification">
                        🔔
                        <span>10</span>
                    </div>

                    <div className="user-info">
                        <Link to="/perfil">
                            <div className="user-avatar">
                                {/* 2. Renderizado dinámico de la imagen */}
                                <img
                                    src={persona?.fotoPerfil || imgUser}
                                    alt="Foto del usuario"
                                    className="img-user"
                                />
                            </div>
                        </Link>
                        <div>
                            <p className="user-name">
                                {/* Muestra el nombre real o el fallback */}
                                {persona?.nombre || "Iván Almestro"}
                            </p>
                            <p className="user-role">Alumno</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;