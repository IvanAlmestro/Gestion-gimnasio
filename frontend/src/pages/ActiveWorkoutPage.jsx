import { useParams, Link } from "react-router-dom";
// uso un hook para evitar mezclar la logica de lo visual y tener un codigo limpio.
import { useActiveWorkout } from "../hooks/useActiveWorkout";
import "../styles/ActiveWorkout.css";

function ActiveWorkoutPage() {
    const { id } = useParams();
    const { exercises, currentIndex, loading, series, progreso,isFinished, handleSiguiente, handleInputChange, handleAgregarSerie } = useActiveWorkout(id);

    if (loading) return <div>Cargando entrenamiento...</div>;
    if (exercises.length === 0) return <div>No hay ejercicios</div>;

    const currentExercise = exercises[currentIndex];
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
            <Link to={`/rutinas/${id}`} className="btn-back">⬅ Volver a mis rutinas</Link>

            <header className="workout-header">
                <h1 className="title-yellow">PUSH DAY</h1>
                <p className="subtitle">Ejercicio {currentIndex + 1} de {exercises.length}</p>
            </header>

            <article className="exercise-card">
                <h2 className="exercise-title">{currentExercise.nombre || "Press Banca"}</h2>
                <span className="badge-pecho">PECHO</span>

                <div className="exercise-info">
                    <p>Objetivo: <span className="highlight">4 series</span> • <span className="highlight">8-10</span> repes • RIR <span className="highlight">0-1</span></p>
                    <p>Último registro: <span className="highlight">50kg x 8</span> repes</p>
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
                                />
                                <span className="unit">kg</span>
                            </div>

                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.reps}
                                    onChange={(e) => handleInputChange(serie.id, 'reps', e.target.value)}
                                />
                            </div>

                            <div className="input-wrapper">
                                <input
                                    type="number"
                                    value={serie.rir}
                                    onChange={(e) => handleInputChange(serie.id, 'rir', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card-actions">
                    <button className="btn-agregar" onClick={handleAgregarSerie}>+ Agregar serie</button>

                    <div className="next-container">
                        <button className="btn-siguiente" onClick={handleSiguiente}>Siguiente</button>
                        <span className="save-status">✓ Guardado automático</span>
                    </div>
                </div>
            </article>

            <div className="workout-progress-container">
                <div className="workout-progress-bar">
                    <div className="workout-progress-fill" style={{ width: `${progreso}%` }}></div>
                </div>
                <p className="workout-progress-text">Progreso {progreso}%</p>
            </div>
        </section>
    );
}

export default ActiveWorkoutPage;