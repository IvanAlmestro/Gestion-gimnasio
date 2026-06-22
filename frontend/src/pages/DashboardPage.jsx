import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

import StatCard from "../components/dashboard/StatCard.jsx";
import NextWorkoutCard from "../components/dashboard/NextWorkoutCard.jsx";
import SmallInfoCard from "../components/dashboard/SmallInfoCard.jsx";
import WeightProgressCard from "../components/dashboard/WeightProgressCard.jsx";

function DashboardPage() {
    const [rutinas, setRutinas] = useState([]);

    const [persona] = useState(() => {
        const personaStorage = localStorage.getItem("persona");

        return personaStorage
            ? JSON.parse(personaStorage)
            : null;
    });

    useEffect(() => {
        async function fetchRutinas() {
            try {
                const response = await fetch("http://localhost:8081/rutinas");

                if (!response.ok) {
                    throw new Error("Error al obtener rutinas");
                }

                const data = await response.json();

                setRutinas(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRutinas();
    }, []);

    return (
        <section className="dashboard-page">

            <div className="dashboard-header-text">
                <h1>Hola, {persona?.nombre || "Iván"} 👋</h1>
                <p>Tus informes y actividades diarias acá</p>
            </div>

            <div className="dashboard-stats">
                <StatCard
                    icon="💪"
                    title="Mis Rutinas"
                    text="Actualmente tenés:"
                    value={rutinas.length}
                    label="rutinas"
                    linkTo="/rutinas"
                />

                <StatCard
                    icon="🏋️"
                    title="Ejercicios"
                    text="Actualmente tenés:"
                    value={24}
                    label="ejercicios"
                    linkTo="/ejercicios"
                />

                <StatCard
                    icon="🗓️"
                    title="Días entrenados"
                    value={125}
                    label="días"
                />
            </div>

            <div className="dashboard-main-grid">
                <NextWorkoutCard />

                <div className="side-cards">
                    <SmallInfoCard
                        icon="🎯"
                        title="Objetivo"
                        value="Hipertrofia"
                    />

                    <SmallInfoCard
                        icon="🔥"
                        title="Racha actual"
                        value={12}
                        label="días"
                    />
                </div>
            </div>

            <WeightProgressCard />

        </section>
    );
}

export default DashboardPage;