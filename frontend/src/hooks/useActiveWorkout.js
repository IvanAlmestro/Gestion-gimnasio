import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {authApi} from "../services/api.js";

export const useActiveWorkout = (rutinaId, diaId) => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);

    // Arrancamos con un array vacío en vez de datos hardcodeados
    const [series, setSeries] = useState([]);

    // Función auxiliar para crear las filas vacías según el objetivo del ejercicio
    const generarSeriesVacias = (cantidadSeriesObjetivo) => {
        // Si el backend dice "4 series", creamos 4 filas vacías
        const cantidad = cantidadSeriesObjetivo || 3; // 3 por defecto por si viene nulo
        const nuevasSeries = Array.from({ length: cantidad }, (_, i) => ({
            id: i + 1,
            peso: "",
            reps: "",
            rir: ""
        }));
        setSeries(nuevasSeries);
    };

    useEffect(() => {
        const fetchRutina = async () => {
            try {
                const token = localStorage.getItem('token');
                // Hacemos el fetch con el rutinaId correcto
                const response = await fetch(`http://localhost:9000/rutinas/${rutinaId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    if (response.status === 401) throw new Error("Error 401: No autorizado");
                    throw new Error(`Error en el servidor: ${response.status}`);
                }

                const data = await response.json();

                // Buscamos el día específico dentro de la rutina que nos devolvió el backend
                const diaActual = data.diasRutina?.find(d => d.id === Number(diaId));

                if (diaActual && diaActual.ejercicios) {
                    setExercises(diaActual.ejercicios);
                    // Preparamos la tabla para el primer ejercicio
                    generarSeriesVacias(diaActual.ejercicios[0].series);
                } else {
                    setExercises([]);
                }

            } catch (error) {
                console.error("Error al cargar rutina:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (rutinaId && diaId) {
            fetchRutina();
        }
    }, [rutinaId, diaId]);

    const puedeAvanzar = series.length > 0 && series.every(serie =>
        String(serie.peso).trim() !== "" &&
        String(serie.reps).trim() !== ""
    );
    const handleSiguiente = () => {
        // Doble validación por seguridad
        if (!puedeAvanzar) return;

        if (currentIndex < exercises.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            generarSeriesVacias(exercises[nextIndex].series);
        } else {
            setIsFinished(true);
        }
    };

    const handleFinalizar = async () => {
        if (!puedeAvanzar) return;

        const registroId = localStorage.getItem("registroActualId");
        if (registroId) {
            try {
                await authApi.put(`/registros/${registroId}/finalizar`);
                localStorage.removeItem("registroActualId");
            } catch (error) {
                console.error("Error al finalizar en el backend:", error);
            }
        }
        setIsFinished(true);
    };
    const handleInputChange = (id, campo, valor) => {
        setSeries(
            series.map((serie) =>
                serie.id === id
                    ? { ...serie, [campo]: valor }
                    : serie
            )
        );
    };

    const handleAgregarSerie = () => {
        setSeries([
            ...series,
            {
                id: series.length + 1,
                peso: "",
                reps: "",
                rir: ""
            }
        ]);
    };

    const progreso = exercises.length > 0
        ? Math.round(((currentIndex + 1) / exercises.length) * 100)
        : 0;

    return {
        exercises,
        currentIndex,
        loading,
        series,
        progreso,
        isFinished,
        puedeAvanzar,
        handleSiguiente,
        handleFinalizar,
        handleInputChange,
        handleAgregarSerie
    };
};