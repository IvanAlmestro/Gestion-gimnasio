import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api.js";

export const useActiveWorkout = (rutinaId, diaId) => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [series, setSeries] = useState([]);

    // NUEVO: Estados del temporizador
    const [isResting, setIsResting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const generarSeriesVacias = (cantidadSeriesObjetivo) => {
        const cantidad = cantidadSeriesObjetivo || 3;
        const nuevasSeries = Array.from({ length: cantidad }, (_, i) => ({
            id: i + 1,
            peso: "",
            reps: "",
            rir: "",
            completada: false // NUEVO: Estado de la fila
        }));
        setSeries(nuevasSeries);
    };

    // NUEVO: Motor del temporizador
    useEffect(() => {
        let timer;
        if (isResting && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (isResting && timeLeft === 0) {
            setIsResting(false);
        }
        return () => clearInterval(timer);
    }, [isResting, timeLeft]);

    useEffect(() => {
        const fetchRutina = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:9000/rutinas/${rutinaId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    if (response.status === 401) throw new Error("Error 401: No autorizado");
                    throw new Error(`Error en el servidor: ${response.status}`);
                }

                const data = await response.json();
                const diaActual = data.diasRutina?.find(d => d.id === Number(diaId));

                if (diaActual && diaActual.ejercicios) {
                    setExercises(diaActual.ejercicios);
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

        if (rutinaId && diaId) fetchRutina();
    }, [rutinaId, diaId]);

    const puedeAvanzar = series.length > 0 && series.every(serie =>
        String(serie.peso).trim() !== "" &&
        String(serie.reps).trim() !== ""
    );

    const handleSiguiente = () => {
        if (!puedeAvanzar) return;

        setIsResting(false); // Apaga el reloj si pasa de ejercicio

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
        setIsResting(false);
        setIsFinished(true);
    };

    const handleInputChange = (id, campo, valor) => {
        setSeries(
            series.map((serie) =>
                serie.id === id ? { ...serie, [campo]: valor } : serie
            )
        );
    };

    // NUEVO: Lógica para marcar/desmarcar serie y lanzar timer
    const handleCompletarSerie = (id, descansoSugeridoSegundos) => {
        setSeries(series.map(serie => {
            if (serie.id === id) {
                const ahoraCompletada = !serie.completada;
                if (ahoraCompletada) {
                    setIsResting(true);
                    setTimeLeft(descansoSugeridoSegundos);
                }
                return { ...serie, completada: ahoraCompletada };
            }
            return serie;
        }));
    };

    const handleAgregarSerie = () => {
        setSeries([...series, { id: series.length + 1, peso: "", reps: "", rir: "", completada: false }]);
    };

    // Controles del temporizador
    const handleAdjustTime = (segundos) => setTimeLeft(prev => Math.max(0, prev + segundos));
    const handleSkipRest = () => { setIsResting(false); setTimeLeft(0); };

    const progreso = exercises.length > 0 ? Math.round(((currentIndex + 1) / exercises.length) * 100) : 0;

    return {
        exercises, currentIndex, loading, series, progreso, isFinished, puedeAvanzar,
        isResting, timeLeft, // Expone los estados del timer
        handleSiguiente, handleFinalizar, handleInputChange, handleAgregarSerie,
        handleCompletarSerie, handleAdjustTime, handleSkipRest // Expone los métodos del timer
    };
};