import { Link } from "react-router-dom";

function RoutineCard({ rutina }) {
    const id = rutina.id || rutina.idRutina;

    return (
        <article className="routine-card">
            <div className="routine-title">
                <span className="routine-icon">💪</span>
                <h3>{rutina.nombre}</h3>
            </div>

            <span className="routine-objective">
                {rutina.objetivo}
            </span>

            <div className="routine-info">
                <p>🔥 {rutina.cantidadEjercicios || 5} ejercicios</p>
                <p>🕒 {rutina.duracion || "60 min aprox"}</p>
            </div>

            <Link to={`/rutinas/${id}`} className="routine-button">
                Ver Rutina
            </Link>
        </article>
    );
}

export default RoutineCard;