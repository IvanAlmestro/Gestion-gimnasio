import { useState, useEffect } from "react";

export const useDashboard = () => {
    const [rutinas, setRutinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Idealmente, esto a futuro vendrá del useAuth que charlamos antes
    const [persona] = useState(() => {
        const personaStorage = localStorage.getItem("persona");
        return personaStorage ? JSON.parse(personaStorage) : null;
    });

    useEffect(() => {
        const fetchRutinas = async () => {
            try {
                // Acá usamos el token porque esta ruta seguro está protegida
                const token = localStorage.getItem("token");

                // NOTA: A futuro cambiaremos localhost por import.meta.env.VITE_API_URL
                const response = await fetch("http://localhost:9000/rutinas", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("Error al obtener rutinas");

                const data = await response.json();
                setRutinas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRutinas();
    }, []);

    return { rutinas, persona, loading, error };
};