import {use, useEffect, useState} from "react";
import RoutineIdCard from "../components/routines/RoutineIdCard.jsx";
import "../styles/RoutinePage.css";
import {Link, useParams} from "react-router-dom";
import routinesPage from "./RoutinesPage.jsx";

function RoutineDetailPage() {

    const [exercises, setExercises] = useState([]);
    /* const [selectedFilter, setSelectedFilter] = useState("first");*/
    const [nombreRutina, setNombreRutina] = useState();
    const[objetivo, setObjetivo] = useState();
    const[duracion, setDuracion] = useState();
    const[routineId, setRoutineId] = useState();
    const { id } = useParams();


    useEffect(() => {
        const token = localStorage.getItem('token');


        const fetchRutina = async () => {
            try {
                // 1. Obtén tu token de donde lo estés guardando (ej. localStorage, sessionStorage, o un Context)
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8081/rutinas/${id}`, {
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
                setNombreRutina(data.nombre)
                setObjetivo(data.objetivo)
                setExercises(data.ejercicios);
                setRoutineId(data.id);
                /*Cálculo dinámico de tiempo estimado de rutina*/
                const totalSeries = data.ejercicios?.reduce((acc, ej) => acc + ej.series, 0) || 0;
                const tiempoEstimado = totalSeries > 0 ? totalSeries * 3 : 90;
                setDuracion(`${tiempoEstimado} min`);

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
            <Link to="/rutinas" className="btn-back">
                ⬅ Volver a mis rutinas
            </Link>


            <div>
                <div>
                    <h1 className="title-rutine">Rutina: {nombreRutina}</h1>
                </div>


            </div>
            <RoutineIdCard
                title={nombreRutina}
                objective= {objetivo}
                duration={duracion}
                exercises={exercises}
                routineId={routineId}
            />

        </section>

    );
}

export default RoutineDetailPage;