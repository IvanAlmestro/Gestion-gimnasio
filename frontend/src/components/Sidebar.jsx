import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("persona");
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    📊 Dashboard
                </NavLink>

                <NavLink
                    to="/rutinas"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    🔷 Rutinas
                </NavLink>

                <NavLink
                    to="/ejercicios"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    🏋️ Ejercicios
                </NavLink>

                <NavLink
                    to="/perfil"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    👤 Perfil
                </NavLink>
            </nav>

            <button className="logout-button" onClick={logout}>
                🚪 Cerrar Sesión
            </button>
        </aside>
    );
}

export default Sidebar;