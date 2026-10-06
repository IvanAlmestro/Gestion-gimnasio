import { useState } from "react";
import { useRutinas } from "./useRutinas";
import { useEjercicios } from "./useEjercicios";

export const useDashboard = () => {

    const { rutinas, loading: rutinasLoading, error: rutinasError, deleteRutina } = useRutinas();

    const { ejercicios, loading: ejerciciosLoading, error: ejerciciosError } = useEjercicios();

    const [persona] = useState(() => {
        const personaStorage = localStorage.getItem("persona");
        return personaStorage ? JSON.parse(personaStorage) : null;
    });

    //  Buscamos la rutina activa directamente en la memoria de React
    // El mét0do .find() busca el primer elemento que cumpla la condición. Si no hay, devuelve undefined.
    const rutinaActiva = rutinas.find(rutina => rutina.activa === true) || null;

    // Unificamos los estados para la vista
    const loading = rutinasLoading || ejerciciosLoading;
    const error = rutinasError || ejerciciosError;

    return {
        rutinas,
        ejercicios,
        persona,
        rutinaActiva,
        loading,
        error,
        deleteRutina
    };
};