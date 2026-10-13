import { Link } from "react-router-dom";

function RoutineCard({ rutina, onDelete, handleActivarRutina}) {
    const id = rutina.id || rutina.idRutina;

    // Calculamos los totales de forma segura por si vienen vacíos
    const cantidadDias = rutina.diasRutina?.length || 0;
    const cantidadEjercicios = rutina.diasRutina?.reduce((total, dia) => total + (dia.ejercicios?.length || 0), 0) || 0;

    return (
        <article className="routine-card">


            <div className="acciones-rutina">
                {/* Botón de Activar (Fuego o Pin) */}
                <button
                    onClick={() => handleActivarRutina(id)}
                    title={rutina.activa ? "Rutina actual" : "Marcar como activa"}
                    className={`btn-icono ${rutina.activa ? 'icono-activo' : 'icono-inactivo'}`}
                >
                    {rutina.activa ? "🔥" : "📌"}
                </button>

                {/* Botón de Eliminar (Tachito) */}
                <button className="btn-icono" title="Eliminar rutina" onClick={() => onDelete(id)}>
                    🗑️
                </button>

            </div>
            <div className="routine-title">
                <span className="routine-icon">💪</span>
                <h3>{rutina.nombre}</h3>
            </div>

            <span className="routine-objective">
                {rutina.objetivo}
            </span>

            <div className="routine-info">
                <p>📅 {cantidadDias} {cantidadDias === 1 ? "día" :"días"}</p>
                <p>🔥 {cantidadEjercicios} ejercicios totales</p>
                <p>🕒 {rutina.duracion || "60 min aprox"}</p>
            </div>

            <Link to={`/rutinas/${id}`} className="routine-button">
                Ver Rutina
            </Link>
        </article>
    );
}

export default RoutineCard;