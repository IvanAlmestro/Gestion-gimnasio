import { useState, useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

function ActiveWorkoutPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const[routineId, setRoutineId] = useState();
    // Estados principales
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // 0 = Primer ejercicio
    const [loading, setLoading] = useState(true);
    // 1. Estado para manejar las filas de la tabla dinámicamente
    const [series, setSeries] = useState([
        { id: 1, peso: "40", reps: "10", rir: "2" },
        { id: 2, peso: "45", reps: "9", rir: "1" },
        { id: 3, peso: "50", reps: "8", rir: "1" }
    ]);

    // 2. Función para actualizar un input específico
    const handleInputChange = (id, campo, valor) => {
        setSeries(series.map(serie =>
            serie.id === id ? { ...serie, [campo]: valor } : serie
        ));
    };

    // 3. Función para agregar una fila nueva
    const handleAgregarSerie = () => {
        const nuevaSerie = {
            id: series.length + 1,
            peso: "",
            reps: "",
            rir: ""
        };
        setSeries([...series, nuevaSerie]);
    };

    useEffect(() => {
        const fetchRutina = async () => {
            // ... validaciones del token ...
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8081/rutinas/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // validas el estado de la respuesta
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Error 401: No estás autorizado. Revisa que el token sea válido.");
                }
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const data = await response.json();
            setExercises(data.ejercicios);
            setLoading(false);
            setRoutineId(data.id);
        };

        fetchRutina();
    }, [id]);

    if (loading) return <div>Cargando entrenamiento...</div>;
    if (exercises.length === 0) return <div>No hay ejercicios</div>;

    // Extraemos el ejercicio actual según el índice
    const currentExercise = exercises[currentIndex];

    // Lógica para el botón "Siguiente"
    const handleSiguiente = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(currentIndex + 1); // Avanza al siguiente ejercicio
        } else {
            // Si es el último, podrías mostrar un resumen o volver al dashboard
            alert("¡Entrenamiento finalizado!");
            navigate("/dashboard");
        }
    };

    return (
        <section >
            <Link to={`/rutinas/${routineId}`} className="btn-back">
                ⬅ Volver a la rutina
            </Link>
            <div className="active-workout-page">
                {/* Header */}
                <header className="workout-header">

                    <h1 className="title-yellow">PUSH DAY</h1>
                    <p className="subtitle">Ejercicio 1 de 4</p>
                </header>

                {/* Tarjeta del Ejercicio */}
                <article className="exercise-card">
                    <h2 className="exercise-title">Press Banca</h2>
                    <span className="badge-pecho">PECHO</span>

                    <div className="exercise-info">
                        <p>Objetivo: <span className="highlight">4 series</span> • <span className="highlight">8-10</span> repes • RIR <span className="highlight">0-1</span></p>
                        <p>Último registro: <span className="highlight">50kg x 8</span> repes</p>
                    </div>

                    {/* Tabla Dinámica */}
                    <div className="workout-table">
                        {/* Encabezados */}
                        <div className="table-header">
                            <span>SERIE</span>
                            <span>PESO</span>
                            <span>REPS</span>
                            <span>RIR</span>
                        </div>

                        {/* Filas */}
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

                    {/* Botones de acción */}
                    <div className="card-actions">
                        <button className="btn-agregar" onClick={handleAgregarSerie}>
                            + Agregar serie
                        </button>

                        <div className="next-container">
                            <button className="btn-siguiente">Siguiente</button>
                            <span className="save-status">✓ Guardado automático</span>
                        </div>
                    </div>
                </article>

                {/* Barra de progreso */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "25%" }}></div>
                    </div>
                    <p className="progress-text">Progreso 25%</p>
                </div>
            </div>


        </section>
    );
}

export default ActiveWorkoutPage;