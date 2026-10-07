import { useState, useEffect } from "react";
import { useRutinas } from "./useRutinas";
import { useEjercicios } from "./useEjercicios";
import { authApi } from "../services/api"; // Asegurate de que la ruta sea correcta

export const useDashboard = () => {

    const { rutinas, loading: rutinasLoading, error: rutinasError, deleteRutina } = useRutinas();
    const { ejercicios, loading: ejerciciosLoading, error: ejerciciosError } = useEjercicios();

    const [persona] = useState(() => {
        const personaStorage = localStorage.getItem("persona");
        return personaStorage ? JSON.parse(personaStorage) : null;
    });

    const [totalEntrenamientos, setTotalEntrenamientos] = useState(0);

    useEffect(() => {
        const fetchEstadisticas = async () => {
            if (!persona || !persona.id) return;

            try {
                const response = await authApi.get(`/registros/usuario/${persona.id}/diasEntrenados`);
                setTotalEntrenamientos(response.data);
            } catch (err) {
                console.error("Error al traer el total de entrenamientos:", err);
            }
        };

        fetchEstadisticas();
    }, [persona]); // Se ejecuta cuando el componente carga y ya tenemos a la persona

    const rutinaActiva = rutinas.find(rutina => rutina.activa === true) || null;

    const loading = rutinasLoading || ejerciciosLoading;
    const error = rutinasError || ejerciciosError;

    return {
        rutinas,
        ejercicios,
        persona,
        rutinaActiva,
        totalEntrenamientos,
        loading,
        error,
        deleteRutina
    };
};