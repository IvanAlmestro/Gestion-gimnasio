import { useDashboard } from "../hooks/useDashboard";
import "../styles/Dashboard.css";

import StatCard from "../components/dashboard/StatCard.jsx";
import NextWorkoutCard from "../components/dashboard/NextWorkoutCard.jsx";
import SmallInfoCard from "../components/dashboard/SmallInfoCard.jsx";
import WeightProgressCard from "../components/dashboard/WeightProgressCard.jsx";

function DashboardPage() {
    const { rutinas,ejercicios, persona, rutinaActiva,totalEntrenamientos, rachaActual, loading, error } = useDashboard();




    if (loading) return <div>Cargando tu panel...</div>;
    if (error) return <div>Ocurrió un error: {error}</div>;

    return (
        <section className="dashboard-page">
            

            <div className="dashboard-stats">
                <StatCard
                    icon="📋"
                    title="Mis Rutinas"
                    text="Actualmente tenés:"
                    value={rutinas.length}
                    label={rutinas.length === 1 ? "rutina" : "rutinas"}
                    linkTo="/rutinas"
                />

                <StatCard
                    icon="💪"
                    title="Ejercicios"
                    text="Actualmente tenés:"
                    value={ejercicios.length || '0'}
                    label={ejercicios.length === 1 ? "ejercicio" : "ejercicios"}
                    linkTo="/ejercicios"
                />

                <StatCard
                    icon="🗓️"
                    title="Días entrenados"
                    value={totalEntrenamientos}
                    text="Actualmente vas:"
                    label = {totalEntrenamientos === 1 ? "día" : "días"}
                />
            </div>

            <div className="dashboard-main-grid">
                <NextWorkoutCard rutina={rutinaActiva} />

                <div className="side-cards">
                    <SmallInfoCard
                        icon="🎯"
                        title="Objetivo"
                        value={persona?.objetivo}
                    />

                    <SmallInfoCard
                        icon="🔥"
                        title="Racha actual"
                        value={rachaActual}
                        label={rachaActual === 1 ? "día" : "días"}
                    />
                </div>
            </div>

            <WeightProgressCard/>

        </section>
    );
}

export default DashboardPage;