import { useState, useEffect } from "react";
import { rutinasApi } from "../services/api";

export const useRutinas = () => {
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const deleteRutina = async (idRutina) => {
        const confirmacion = window.confirm("¿Estás seguro de que querés eliminar esta rutina?");

        if (confirmacion) {
            try {
                await rutinasApi.delete(`/rutinas/${idRutina}`);
                // Actualiza el estado interno del hook
                setRutinas((actuales) => actuales.filter(r => r.id !== idRutina));
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Hubo un problema al intentar eliminar la rutina.");
            }
        }
    };
    useEffect(() => {
        const fetchRutinas = async () => {
            setLoading(true);
            try {
                const response = await rutinasApi.get("/rutinas");
                setRutinas(response.data);
            } catch (err) {
                setError("Ocurrió un error al cargar tus rutinas.");
            } finally {
                setLoading(false);
            }
        };

        fetchRutinas();
    }, []);

    return { rutinas,setRutinas, loading, error, deleteRutina};
};