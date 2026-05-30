import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logoGym from "../assets/logogym.png";

function Navbar() {

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("persona");
        navigate("/login");
        window.location.reload();
    }

    return (

        <nav className="navbar">

            <Link to="/dashboard">
                <h2>GymApp</h2>
            </Link>

            <Link to="/dashboard">
                <img src={logoGym} alt="logo" className="img-logo"></img>
            </Link>

            <div className="nav-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>
                <Link to="/rutinas">
                    Rutinas
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    )
}

export default Navbar;