import { useState } from "react";
import { useRutinas } from "../hooks/useRutinas";
import RoutineCard from "../components/routines/RoutineCard.jsx";
import "../styles/RoutinePage.css";

//Datos estáticos y de configuración fuera del render cycle
const FILTERS = [
    { label: "Todas", value: "TODAS" },
    { label: "Hipertrofia", value: "HIPERTROFIA" },
    { label: "Adaptación", value: "ADAPTACION" },
    { label: "Fuerza", value: "FUERZA" },
    { label: "Definición", value: "DEFINICION" },
    { label: "Resistencia", value: "RESISTENCIA" },
    { label: "Rehabilitación", value: "REHABILITACION" },
    { label: "Movilidad", value: "MOVILIDAD" }
];

function RutinasPage() {
    const { rutinas, loading, error } = useRutinas();
    const [selectedFilter, setSelectedFilter] = useState("TODAS");

    const filteredRutinas = selectedFilter === "TODAS"
        ? rutinas
        : rutinas.filter((rutina) => rutina.objetivo === selectedFilter);

    if (loading) return <div>Cargando tus rutinas...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="rutinas-page">
            <div className="rutinas-header">
                <div>
                    <h1>Mis rutinas:</h1>
                    <p>Gestioná tus planes de entrenamiento</p>
                </div>

                <button className="new-routine-button">+ Nueva Rutina</button>
            </div>

            <div className="rutinas-filters">
                {FILTERS.map((filter) => (
                    <button
                        key={filter.value}
                        className={selectedFilter === filter.value ? "routine-filter active" : "routine-filter"}
                        onClick={() => setSelectedFilter(filter.value)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <p className="rutinas-count">{filteredRutinas.length} rutinas encontradas</p>

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