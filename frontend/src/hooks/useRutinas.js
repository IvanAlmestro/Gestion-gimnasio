import { useState, useEffect } from "react";
import { rutinasApi } from "../services/api";

export const useRutinas = () => {
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return { rutinas,setRutinas, loading, error };
};