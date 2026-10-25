import { useParams, Link } from "react-router-dom";
import { useActiveWorkout } from "../hooks/useActiveWorkout";
import { useRutinas } from "../hooks/useRutinas.js";
import { Check } from "lucide-react"; // Importamos el ícono para el botón de completado
import "../styles/ActiveWorkout.css";

function ActiveWorkoutPage() {
    const { rutinaId, diaId } = useParams();
    const {
        exercises, currentIndex, loading, series, isFinished, puedeAvanzar,
        isResting, timeLeft, handleSiguiente, handleFinalizar, handleInputChange,
        handleAgregarSerie, handleCompletarSerie, handleAdjustTime, handleSkipRest
    } = useActiveWorkout(rutinaId, diaId);

    const { rutinas } = useRutinas();

    if (loading) return <div>Cargando entrenamiento...</div>;
    if (exercises.length === 0) return <div>No hay ejercicios</div>;

    const currentRutina = rutinas.find((r) => r.id === Number(rutinaId)) || {};
    const currentExercise = exercises[currentIndex];
    const currentDia = currentRutina.diasRutina?.find((d) => d.id === Number(diaId));
    const isLastExercise = currentIndex === exercises.length - 1;

    // Función auxiliar para formatear el temporizador (ej: 90 -> 1:30)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Extrae los segundos del string de descanso (ej: "60s" -> 60). Por defecto 90s.
    const descansoSegundos = parseInt(currentExercise.descanso) || 90;

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


            <header className="workout-header">
                <Link to={`/rutinas/${rutinaId}`} className="btn-volver">⬅ Volver a mis rutinas</Link>
                <h1 className="title-rutineActive">{currentRutina.nombre || "Rutina Actual"}</h1>
                <div className="title-day-container">
                    <h3 className="title-day">{currentDia?.nombre}</h3>
                    <p className="subtitle">(Ejercicio {currentIndex + 1} de {exercises.length})</p>
                </div>

            </header>

            <article className="active-routine exercise-card">
                <h2 className="exercise-title">{currentExercise.ejercicioNombre || "Ejercicio Actual"}</h2>
                <span className="badge-pecho">{currentExercise.grupoMuscular || "No Especificado"} </span>

                <div className="exercise-info">
                    <p className="exercise-info-p">
                        Objetivo: <span className="highlight">{currentExercise.series || 0} series</span> •
                        <span className="highlight"> {currentExercise.repeticiones || 0}</span> repes •
                        RIR <span className="highlight">{currentExercise.rir || 0}</span>
                    </p>
                    <p className="exercise-info-p">Descanso sugerido: <span className="highlight">{currentExercise.descanso || "60s"}</span></p>
                    <p className="exercise-info-p">Último registro: <span className="highlight">
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
                        <span>{/* Columna vacía para alinear el check */}</span>
                    </div>

                    {series.map((serie, index) => (
                        <div className={`table-row ${serie.completada ? 'row-completed' : ''}`} key={serie.id}>
                            <div className="serie-number">{index + 1}</div>

                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.peso}
                                    onChange={(e) => handleInputChange(serie.id, 'peso', e.target.value)}
                                    disabled={serie.completada}
                                    required
                                />
                                <span className="unit">kg</span>
                            </div>

                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.reps}
                                    onChange={(e) => handleInputChange(serie.id, 'reps', e.target.value)}
                                    disabled={serie.completada}
                                    required
                                />
                            </div>

                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.rir}
                                    onChange={(e) => handleInputChange(serie.id, 'rir', e.target.value)}
                                    disabled={serie.completada}
                                    required
                                />
                            </div>

                            {/* Botón interactivo de Check */}
                            <button
                                className={`btn-check ${serie.completada ? 'checked' : ''}`}
                                onClick={() => handleCompletarSerie(serie.id, descansoSegundos)}
                            >
                                <Check size={20} strokeWidth={serie.completada ? 3 : 2} />
                            </button>
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
                                    backgroundColor: puedeAvanzar ? '#10b981' : '#4b5563',
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

            {/* STICKY TIMER: Solo aparece si está descansando */}
            {isResting && (
                <div className="sticky-timer">
                    <div className="timer-info">
                        <span className="timer-label">Descanso</span>
                        <span className="timer-clock">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="timer-controls">
                        <button className="timer-btn" onClick={() => handleAdjustTime(-10)}>-10s</button>
                        <button className="timer-btn" onClick={() => handleAdjustTime(30)}>+30s</button>
                        <button className="timer-btn skip" onClick={handleSkipRest}>Saltar</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ActiveWorkoutPage;