import { useEffect, useState } from "react";
import RoutineIdCard from "../components/routines/RoutineIdCard.jsx";
import "../styles/RoutinePage.css";
import { useParams } from "react-router-dom";

function RoutineDetailPage() {

    const [exercises, setExercises] = useState([]);
    /* const [selectedFilter, setSelectedFilter] = useState("first");*/
    const [nombreRutina, setNombreRutina] = useState();
    const { id } = useParams();


    useEffect(() => {
        const token = localStorage.getItem('token'); // <- Ajusta esto según tu proyecto
        console.log("Token a enviar:", token);
        const fetchRutina = async () => {
            try {
                // 1. Obtén tu token de donde lo estés guardando (ej. localStorage, sessionStorage, o un Context)
                const token = localStorage.getItem('token'); // <- Ajusta esto según tu proyecto
                const response = await fetch(`http://localhost:8080/rutinas/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                // 1. PRIMERO validas el estado de la respuesta
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Error 401: No estás autorizado. Revisa que el token sea válido.");
                    }
                    throw new Error(`Error en el servidor: ${response.status}`);
                }

                // 2. DESPUÉS procesas el JSON (solo si la respuesta fue exitosa)
                const data = await response.json();


                console.log(data);
                setExercises(data.ejercicios);

            } catch (error) {
                console.error("Ocurrió un error:", error.message);
            }
        }

        fetchRutina();
    }, [id]);
/*
    const filters = [
        { label: "Primer Dia", value: "primero" },
        { label: "Segundo Dia", value: "segundo" },
        { label: "Tercer Dia", value: "tercero" }
    ];

 */
    return (
        <section>
            <div>
                <div>
                    <h1>{nombreRutina}</h1>
                </div>


            </div>
            <RoutineIdCard
                title="Push Day"
                objective="HIPERTROFIA"
                duration="60 min"
                exercises={exercises}
            />

        </section>

    );
}

export default RoutineDetailPage;