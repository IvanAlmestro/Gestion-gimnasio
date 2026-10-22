
import '../../styles/ExerciseModal.css'

function ExerciseModal({ ejercicio, onClose }) {
    if (!ejercicio) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Evitamos que el clic dentro del modal lo cierre */}
            <div className="modal-content exercise-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>

                {/* ESPACIO PARA EL FUTURO GIF / IMAGEN */}
                <div className="exercise-visual">
                    {ejercicio.imagenUrl ? (
                        <img src={ejercicio.imagenUrl} alt={ejercicio.nombre} />
                    ) : (
                        <div className="visual-placeholder">
                            <span>📷</span>
                            <p>Animación en desarrollo</p>
                        </div>
                    )}
                </div>

                <div className="exercise-header">
                    <h2>{ejercicio.nombre}</h2>
                    <span className="muscle-badge">{ejercicio.grupoMuscular}</span>
                </div>

                {/* PARÁMETROS RECOMENDADOS (Tus datos actuales) */}
                <div className="exercise-stats-grid">
                    <div className="stat-box">
                        <span className="stat-label">Series base</span>
                        <strong className="stat-value">{ejercicio.series || "-"}</strong>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Reps.</span>
                        <strong className="stat-value">{ejercicio.repeticiones || "-"}</strong>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">RIR</span>
                        <strong className="stat-value">{ejercicio.rir || "-"}</strong>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Descanso</span>
                        <strong className="stat-value">{ejercicio.descanso || "-"}</strong>
                    </div>
                </div>

                {/* FUTURA DESCRIPCIÓN */}
                <div className="exercise-instructions">
                    <h3>Técnica recomendada</h3>
                    <p>
                        {ejercicio.descripcion || "La explicación detallada paso a paso para la correcta ejecución de este ejercicio estará disponible próximamente."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ExerciseModal;