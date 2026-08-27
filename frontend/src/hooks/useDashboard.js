import { useState } from "react";
import { useRutinas } from "./useRutinas";
import { useEjercicios } from "./useEjercicios"; // Importamos tu nuevo hook

export const useDashboard = () => {
    // 1. Traemos las rutinas (renombramos loading y error)
    const {rutinas, loading: rutinasLoading, error: rutinasError, deleteRutina} = useRutinas();

    // 2. Traemos los ejercicios (renombramos loading y error)
    const {ejercicios, loading: ejerciciosLoading, error: ejerciciosError} = useEjercicios();

    const [persona] = useState(() => {
        const personaStorage = localStorage.getItem("persona");
        return personaStorage ? JSON.parse(personaStorage) : null;
    });

    // 3. Unificamos los estados para la vista
    // Va a mostrar "cargando" mientras CUALQUIERA de los dos siga cargando
    const loading = rutinasLoading || ejerciciosLoading;

    // Muestra el primer error que aparezca
    const error = rutinasError || ejerciciosError;

    // 4. Exportamos también "ejercicios"
    return { rutinas, ejercicios, persona, loading, error, deleteRutina };
};