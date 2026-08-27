import { Link } from "react-router-dom";

function RoutineCard({ rutina, onDelete}) {
    const id = rutina.id || rutina.idRutina;

    return (
        <article className="routine-card">
            <button
                className="delete-card-btn"
                onClick={() => onDelete(rutina.id)}
                title="Eliminar rutina"
            >🗑️
            </button>
            <div className="routine-title">
                <span className="routine-icon">💪</span>
                <h3>{rutina.nombre}</h3>
            </div>

            <span className="routine-objective">
                {rutina.objetivo}
            </span>

            <div className="routine-info">
                <p>🔥 {rutina.ejercicios.length} ejercicios</p>
                <p>🕒 {rutina.duracion || "60 min aprox"}</p>
            </div>

            <Link to={`/rutinas/${id}`} className="routine-button">
                Ver Rutina
            </Link>
        </article>
    );
}

export default RoutineCard;