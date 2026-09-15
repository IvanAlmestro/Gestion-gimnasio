import { useState, useEffect } from "react";
import { rutinasApi } from "../services/api"; // Tu nueva instancia de Axios

export const useRoutineDetail = (id) => {
    // Agrupamos la data en un solo estado para no tener 5 sueltos
    const [routineData, setRoutineData] = useState({
        nombre: "",
        objetivo: "",
        diasRutina: [],
        duracion: "0 min",
        routineId: null
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRutina = async () => {
            setLoading(true);
            try {
                // Axios ya sabe la URL base y ya le pega el token automáticamente
                const response = await rutinasApi.get(`/rutinas/${id}`);
                const data = response.data;

                // Tu excelente cálculo dinámico
                const totalSeries = data.diasRutina?.reduce((acc, ej) => acc + ej.series, 0) || 0;
                const tiempoEstimado = totalSeries > 0 ? totalSeries * 3 : 90;

                setRoutineData({
                    nombre: data.nombre,
                    objetivo: data.objetivo,
                    diasRutina: data.diasRutina,
                    duracion: `${tiempoEstimado} min`,
                    routineId: data.id
                });
            } catch (err) {
                setError("Ocurrió un error al cargar la rutina.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRutina();
    }, [id]);

    return { ...routineData, loading, error };
};