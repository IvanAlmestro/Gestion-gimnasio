import { useState, useEffect, useCallback } from "react";
// Asegurate de que esta ruta a tu api sea la correcta en tu proyecto
import { rutinasApi } from "../services/api";

export const useEjercicios = () => {
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true); // Ya arranca cargando por defecto
    const [error, setError] = useState(null);

    // 1. useCallback memoriza la función para que sea segura de usar como dependencia
    const fetchEjercicios = useCallback(async (signal, isRefetch = false) => {
        // Solo forzamos el loading y limpiamos errores si es una recarga manual
        if (isRefetch) {
            setLoading(true);
            setError(null);
        }

        try {
            const response = await rutinasApi.get("/ejercicios", { signal });
            setEjercicios(response.data);
            setError(null); // Limpiamos cualquier error previo si la petición fue un éxito
        } catch (err) {
            if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
                return;
            }
            console.error(err);
            setError("Ocurrió un error al cargar tus ejercicios.");
        } finally {
            setLoading(false);
        }
    }, []); // Array vacío: la función no depende de variables externas que cambien

    useEffect(() => {
        const controller = new AbortController();

        // Le avisamos al linter que ignore esta validación puntual
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEjercicios(controller.signal, false);

        return () => {
            controller.abort();
        };
    }, [fetchEjercicios]);

    // 3. Exportamos la función refetch pasándole el parámetro en true
    return {
        ejercicios,
        loading,
        error,
        refetch: () => fetchEjercicios(undefined, true)
    };
};