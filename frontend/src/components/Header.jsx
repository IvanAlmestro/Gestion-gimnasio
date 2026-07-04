import "../styles/Header.css";
import imgUser from "../assets/user-img.jpg";

function Header() {
    const persona = JSON.parse(localStorage.getItem("persona"));

    return (
        <header className="app-header">
            <p className="header-date">Martes, 30 de junio</p>

            <div className="header-user">
                <div className="notification">
                    🔔
                    <span>10</span>
                </div>

                <div className="user-info">
                    <div className="user-avatar">
                        <img src={imgUser} alt="imgUser" className="img-user"/>
                    </div>

                    <div>
                        <p className="user-name">
                            {persona?.nombre || "Iván Almestro"}
                        </p>
                        <p className="user-role">Alumno</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;