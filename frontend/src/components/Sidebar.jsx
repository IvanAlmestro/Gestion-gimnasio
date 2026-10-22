import { NavLink, useNavigate } from "react-router-dom";
// Importamos los íconos de Lucide
import { LayoutDashboard, ClipboardList, Dumbbell, User, LogOut } from "lucide-react";
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

                <NavLink to="/dashboard" className="brand-link">
                    <h2 className="limitless-logo">
                        LIMIT<span>LESS</span>
                    </h2>
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    {/* El size=20 asegura que el ícono tenga el tamaño perfecto al lado del texto */}
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/rutinas"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <ClipboardList size={20} />
                    Rutinas
                </NavLink>

                <NavLink
                    to="/ejercicios"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <Dumbbell size={20} />
                    Ejercicios
                </NavLink>

                <NavLink
                    to="/perfil"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <User size={20} />
                    Perfil
                </NavLink>
            </nav>

            <button className="logout-button" onClick={logout}>
                <LogOut size={20} />
                Cerrar Sesión
            </button>
        </aside>
    );
}

export default Sidebar;