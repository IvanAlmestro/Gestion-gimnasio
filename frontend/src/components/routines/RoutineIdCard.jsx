import { useState } from "react";
// 1. NUEVO: Importamos useLocation para poder leer el ?dia=X de la URL
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import { authApi } from "../../services/api.js";

function RoutineIdCard({
                           objective,
                           duration,
                           dias,
                           routineId }) {
    const navigate = useNavigate();
    const location = useLocation(); // Instanciamos useLocation
    const { persona } = useAuth();

    // 2. NUEVO: Leemos el parámetro de la URL
    const queryParams = new URLSearchParams(location.search);
    const diaDesdeUrl = queryParams.get("dia");

    // 3. CAMBIO: Inicializamos el estado con el número de la URL (si no hay, usamos 0)
    const [diaActivoIndex, setDiaActivoIndex] = useState(
        diaDesdeUrl ? parseInt(diaDesdeUrl, 10) : 0
    );

    const totalExercises = dias?.reduce((total, dia) => total + (dia.ejercicios?.length || 0), 0) || 0;
    const diaActual = dias && dias.length > 0 ? dias[diaActivoIndex] : null;

    const handleComenzar = async () => {
        if (!diaActual || !persona) {
            console.error("Faltan datos del día o del usuario logueado.");
            return;
        }

        try {
            // 4. CAMBIO: Borramos el payload y armamos la URL completa con backticks (``)
            const response = await authApi.post(
                `/registros/usuario/${persona.id}/rutina/${routineId}/comenzar/${diaActual.id}`
            );

            if (response.status === 200) {
                console.log("Backend responde:", response.data);
                // Guardamos el ID del registro en curso
                localStorage.setItem("registroActualId", response.data);
                navigate(`/entrenamiento/${routineId}/dia/${diaActual.id}`);

            }
        } catch (error) {
            console.error("Error al iniciar el entrenamiento:", error);
        }
    };

    return (
        <article className="routine-id-card">
            <h2>Detalle de Entrenamiento</h2>

            <div className="routine-id-info">
                <span>📅 {dias?.length || 0}  {dias.length ===1 ? "dia" : "dias"}</span>
                <span>🔥 {totalExercises} ejercicios </span>
                <span>🏆 {objective}</span>
                <span>🕒 {duration}</span>
            </div>

            {diaActual ? (
                <div className="dias-carousel-container" style={{ width: '100%' }}>

                    {/* 1. LA BOTONERA (TABS) */}
                    <div className="dias-tabs" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '25px', flexWrap: 'wrap' }}>
                        {dias.map((dia, index) => (
                            <button
                                key={dia.id}
                                onClick={() => setDiaActivoIndex(index)}
                                className={`day-button ${diaActivoIndex === index ? 'active' : ''}`}
                            >
                                {dia.nombre.split(':')[0]}
                            </button>
                        ))}
                    </div>

                    {/* 2. LA TARJETA DEL DÍA (Solo se renderiza el seleccionado) */}
                    <div className="dia-card" style={{ marginTop: 0 }}>
                        <div className="dia-header">
                            <h3>📅 {diaActual.nombre}</h3>
                        </div>

                        <div className="table-responsive">
                            <table className="ejercicios-table">
                                <thead>
                                <tr>
                                    <th>Ejercicio</th>
                                    <th>Series</th>
                                    <th>Repes</th>
                                    <th>Notas</th>
                                </tr>
                                </thead>
                                <tbody>
                                {diaActual.ejercicios?.map((ficha) => (
                                    <tr key={ficha.id}>
                                        <td className="td-nombre">{ficha.ejercicioNombre}</td>
                                        <td>{ficha.series}</td>
                                        <td>{ficha.repeticiones}</td>
                                        <td className="td-notas">{ficha.notas || "-"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <p style={{ color: '#94a3b8' }}>No hay días configurados para esta rutina.</p>
            )}

            {/* 3. EL BOTÓN DINÁMICO */}
            <button onClick={handleComenzar} className="btn-comenzar" style={{ marginTop: '35px' }}>
                Comenzar {diaActual ? diaActual.nombre.split(':')[0] : 'Rutina'}
            </button>

        </article>
    );
}

export default RoutineIdCard;