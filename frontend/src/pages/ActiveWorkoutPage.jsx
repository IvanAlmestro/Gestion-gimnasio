import { useParams, Link } from "react-router-dom";
import { useActiveWorkout } from "../hooks/useActiveWorkout";
import { useRutinas } from "../hooks/useRutinas.js";
import { authApi } from "../services/api.js"; // 1. NUEVO: Importamos la API
import "../styles/ActiveWorkout.css";

function ActiveWorkoutPage() {
    const { rutinaId, diaId } = useParams();
    const {
        exercises, currentIndex, loading, series, progreso, isFinished,
        puedeAvanzar, handleSiguiente, handleFinalizar, handleInputChange, handleAgregarSerie
    } = useActiveWorkout(rutinaId, diaId);
    const { rutinas } = useRutinas();

    if (loading) return <div>Cargando entrenamiento...</div>;
    if (exercises.length === 0) return <div>No hay ejercicios</div>;

    const currentRutina = rutinas.find((r) => r.id === Number(rutinaId)) || {};
    const currentExercise = exercises[currentIndex];
    const currentDia = currentRutina.diasRutina?.find((d) => d.id === Number(diaId));

    // 2. NUEVO: Variable para saber si estamos en el último ejercicio
    const isLastExercise = currentIndex === exercises.length - 1;


    // Pantalla de éxito (¡ya la tenías perfecta!)
    if (isFinished) {
        return (
            <section className="active-workout-page">
                <article className="exercise-card">
                    <div className="finish-card-content">
                        <h2 className="title-yellow finish-title">¡Entrenamiento Finalizado!</h2>
                        <p className="finish-text">Excelente trabajo. Todas tus series fueron registradas correctamente.</p>
                        <Link to="/dashboard" className="btn-siguiente btn-volver-inicio">Volver al Inicio</Link>
                    </div>
                </article>
            </section>
        );
    }

    return (
        <section className="active-workout-page">
            <Link to={`/rutinas/${rutinaId}`} className="btn-back">⬅ Volver a mis rutinas</Link>

            <header className="workout-header">
                <h1 className="title-rutineActive">{currentRutina.nombre || "Rutina Actual"}</h1>
                <h3  className="title-day">
                    {currentDia?.nombre}
                </h3>
                <p className="subtitle">Ejercicio {currentIndex + 1} de {exercises.length}</p>
            </header>

            <article className="active-routine exercise-card">
                <h2 className="exercise-title">{currentExercise.ejercicioNombre || "Ejercicio Actual"}</h2>
                <span className="badge-pecho">{currentExercise.grupoMuscular}</span>

                <div className="exercise-info">
                    <p>
                        Objetivo: <span className="highlight">{currentExercise.series || 0} series</span> •
                        <span className="highlight"> {currentExercise.repeticiones || 0}</span> repes •
                        RIR <span className="highlight">{currentExercise.rir || 0}</span>
                    </p>
                    <p>Descanso sugerido: <span className="highlight">{currentExercise.descanso || "60s"}</span></p>
                    <p>Último registro: <span className="highlight">
                        {currentExercise.ultimoRegistro ?
                            `${currentExercise.ultimoRegistro.peso}kg x ${currentExercise.ultimoRegistro.reps} repes`
                            : "Sin registros previos"}
                    </span></p>
                </div>

                <div className="workout-table">
                    <div className="table-header">
                        <span>SERIE</span>
                        <span>PESO</span>
                        <span>REPS</span>
                        <span>RIR</span>
                    </div>

                    {series.map((serie, index) => (
                        <div className="table-row" key={serie.id}>
                            <div className="serie-number">{index + 1}</div>
                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.peso}
                                    onChange={(e) => handleInputChange(serie.id, 'peso', e.target.value)}
                                    required
                                />
                                <span className="unit">kg</span>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.reps}
                                    onChange={(e) => handleInputChange(serie.id, 'reps', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.rir}
                                    onChange={(e) => handleInputChange(serie.id, 'rir', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card-actions">
                    <button className="btn-agregar" onClick={handleAgregarSerie}>+ Agregar serie</button>
                    <div className="next-container">
                        {isLastExercise ? (
                            <button
                                className="btn-siguiente"
                                style={{
                                    backgroundColor: puedeAvanzar ? '#10b981' : '#4b5563', // Gris si está bloqueado, Verde si está listo
                                    cursor: puedeAvanzar ? 'pointer' : 'not-allowed',
                                    opacity: puedeAvanzar ? 1 : 0.5
                                }}
                                onClick={handleFinalizar}
                                disabled={!puedeAvanzar}
                            >
                                Finalizar Entrenamiento ✔️
                            </button>
                        ) : (
                            <button
                                className="btn-siguiente"
                                onClick={handleSiguiente}
                                disabled={!puedeAvanzar}
                                style={{
                                    cursor: puedeAvanzar ? 'pointer' : 'not-allowed',
                                    opacity: puedeAvanzar ? 1 : 0.5
                                }}
                            >
                                Siguiente
                            </button>
                        )}
                        <span className="save-status">✓ Guardado automático</span>
                    </div>
                </div>
            </article>
        </section>
    );
}

export default ActiveWorkoutPage;