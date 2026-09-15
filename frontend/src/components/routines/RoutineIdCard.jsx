import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import { authApi } from "../../services/api.js";

function RoutineIdCard({
                           title,
                           objective,
                           duration,
                           dias,
                           routineId }) {
    const navigate = useNavigate();
    const { persona } = useAuth();

    // ESTADO: Guardamos el índice del día que estamos visualizando (por defecto el 0)
    const [diaActivoIndex, setDiaActivoIndex] = useState(0);

    const totalExercises = dias?.reduce((total, dia) => total + (dia.ejercicios?.length || 0), 0) || 0;

    // Extraemos el objeto del día actual para no escribir dias[diaActivoIndex] todo el tiempo
    const diaActual = dias && dias.length > 0 ? dias[diaActivoIndex] : null;

    const handleComenzar = async () => {
        if (!diaActual) return;

        try {
            const payload = {
                usuarioId: persona.id,
                rutinaId: routineId,
                // le manda al backend qué día exacto está empezando
                diaRutinaId: diaActual.id
            };

            const response = await authApi.post("/rutinas/comenzar", payload);

            if (response.status === 200) {
                console.log("Backend responde:", response.data);
                // Navegamos pasando la info del día para que la próxima pantalla sepa qué renderizar
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
                <span>📅 {dias?.length || 0} Días</span>
                <span>🔥 {totalExercises} ejercicios</span>
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
                                className={`tab-button ${diaActivoIndex === index ? 'active' : ''}`}
                            >
                                {/* Cortamos el string para que en la pestaña solo diga "Día 1", "Día 2", etc. */}
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