import { Link } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {

    return (

        <nav className="navbar">

            <h2>GymApp</h2>

            <div className="nav-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/rutinas">
                    Rutinas
                </Link>

                <Link to="/perfil">
                    Perfil
                </Link>

            </div>

        </nav>
    )
}

export default Navbar;