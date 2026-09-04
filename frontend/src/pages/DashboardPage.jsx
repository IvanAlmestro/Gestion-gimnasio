import { useDashboard } from "../hooks/useDashboard";
import "../styles/Dashboard.css";

import StatCard from "../components/dashboard/StatCard.jsx";
import NextWorkoutCard from "../components/dashboard/NextWorkoutCard.jsx";
import SmallInfoCard from "../components/dashboard/SmallInfoCard.jsx";
import WeightProgressCard from "../components/dashboard/WeightProgressCard.jsx";

function DashboardPage() {
    const { rutinas,ejercicios, persona, loading, error ,deleteRutina} = useDashboard();


    if (loading) return <div>Cargando tu panel...</div>;
    if (error) return <div>Ocurrió un error: {error}</div>;

    return (
        <section className="dashboard-page">

            <div className="dashboard-header-text">
                <h1>Hola, {persona?.nombre || "Iván"} 👋</h1>
                <p>Tus informes y actividades diarias acá</p>
            </div>

            <div className="dashboard-stats">
                <StatCard
                    icon="📋"
                    title="Mis Rutinas"
                    text="Actualmente tenés:"
                    value={rutinas.length}
                    label="rutinas"
                    linkTo="/rutinas"
                />

                <StatCard
                    icon="💪"
                    title="Ejercicios"
                    text="Actualmente tenés:"
                    value={ejercicios.length || '0'}
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
                        value={persona?.objetivo}
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