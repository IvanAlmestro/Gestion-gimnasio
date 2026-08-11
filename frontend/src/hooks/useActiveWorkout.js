import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useActiveWorkout = (id) => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [routineId, setRoutineId] = useState();
    const [isFinished, setIsFinished] = useState(false);
    const [series, setSeries] = useState([{ id: 1, peso: "40", reps: "10", rir: "2" }, { id: 2, peso: "45", reps: "9", rir: "1" }, { id: 3, peso: "50", reps: "8", rir: "1" }]);

    useEffect(() => {
        const fetchRutina = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8081/rutinas/${id}`, { method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
                if (!response.ok) { if (response.status === 401) throw new Error("Error 401: No autorizado"); throw new Error(`Error en el servidor: ${response.status}`); }
                const data = await response.json();
                setExercises(data.ejercicios);
                setRoutineId(data.id);
            } catch (error) {
                console.error("Error al cargar rutina:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRutina();
    }, [id]);
    //Avanza al siguiente ejercicio
    const handleSiguiente = () => {
        if (currentIndex < exercises.length - 1)
            setCurrentIndex(currentIndex + 1);
        else {
            setIsFinished(true);
        }
    };
    // Maneja el cambio de valor en los inputs (peso, reps, rir)
    const handleInputChange = (id, campo, valor) => {
        setSeries(
            series.map((serie) =>
                serie.id === id
                    ? { ...serie, [campo]: valor }
                    : serie
            )
        );
    };
    // Agrega una nueva fila vacía al final de la tabla
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
    // Calcula el porcentaje de la barra de progreso
    const progreso = exercises.length > 0
        ? Math.round(((currentIndex + 1) / exercises.length) * 100)
        : 0;

    return { exercises, currentIndex, loading, series, progreso, isFinished, handleSiguiente, handleInputChange, handleAgregarSerie };
};