import { useEffect, useState } from "react";
import RoutineCard from "../components/routines/RoutineCard.jsx";
import "../styles/RoutinePage.css";

function RutinasPage() {
    const [rutinas, setRutinas] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("TODAS");
    const [ejercicios, setEjercicios] = useState([]);

    useEffect(() => {
        async function fetchRutinas() {
            try {
                const response = await fetch("http://localhost:8081/rutinas");

                if (!response.ok) {
                    throw new Error("Error al obtener rutinas");
                }

                const data = await response.json();
                /*setEjercicios(data.ejercicios)*/
                setRutinas(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRutinas();
    }, []);

    const filters = [
        { label: "Todas", value: "TODAS" },
        { label: "Hipertrofia", value: "HIPERTROFIA" },
        { label: "Adaptación", value: "ADAPTACION" },
        { label: "Fuerza", value: "FUERZA" },
        { label: "Definición", value: "DEFINICION" },
        { label: "Resistencia", value: "RESISTENCIA" },
        { label: "Rehabilitación", value: "REHABILITACION" },
        { label: "Movilidad", value: "MOVILIDAD" }
    ];

    const filteredRutinas =
        selectedFilter === "TODAS"
            ? rutinas
            : rutinas.filter((rutina) => rutina.objetivo === selectedFilter);

    return (
        <section className="rutinas-page">
            <div className="rutinas-header">
                <div>
                    <h1>Mis rutinas:</h1>
                    <p>Gestioná tus planes de entrenamiento</p>
                </div>

                <button className="new-routine-button">
                    + Nueva Rutina
                </button>
            </div>

            <div className="rutinas-filters">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        className={
                            selectedFilter === filter.value
                                ? "routine-filter active"
                                : "routine-filter"
                        }
                        onClick={() => setSelectedFilter(filter.value)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <p className="rutinas-count">
                {filteredRutinas.length} rutinas encontradas
            </p>

            <div className="rutinas-grid">
                {filteredRutinas.map((rutina) => (
                    <RoutineCard
                        key={rutina.id || rutina.idRutina}
                        rutina={rutina}

                    />
                ))}
            </div>
        </section>
    );
}

export default RutinasPage;