import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

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
                const response = await fetch(
                    "http://localhost:8081/rutinas"
                );

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
                <h1>
                    Hola, {persona?.nombre || "Iván"} 👋
                </h1>

                <p>
                    Tus informes y actividades diarias acá
                </p>
            </div>

            <div className="dashboard-stats">
                <article className="stat-card">
                    <div className="stat-title">
                        <span>💪</span>
                        <h3>Mis Rutinas</h3>
                    </div>

                    <p>Actualmente tenés:</p>

                    <strong>{rutinas.length}</strong>

                    <span>rutinas</span>

                    <Link to="/rutinas" className="primary-button">
                        Ver
                    </Link>
                </article>

                <article className="stat-card">
                    <div className="stat-title">
                        <span>🏋️</span>
                        <h3>Ejercicios</h3>
                    </div>

                    <p>Actualmente tenés:</p>

                    <strong>24</strong>

                    <span>ejercicios</span>

                    <Link to="/ejercicios" className="primary-button">
                        Ver
                    </Link>
                </article>

                <article className="stat-card">
                    <div className="stat-title">
                        <span>🗓️</span>
                        <h3>Días entrenados</h3>
                    </div>

                    <strong>125</strong>

                    <span>días</span>
                </article>
            </div>

            <div className="dashboard-main-grid">

                <article className="next-workout-card">
                    <h2>🔥 Próximo entrenamiento</h2>

                    <h3>Push Day</h3>

                    <p>Pecho • Hombros • Tríceps</p>

                    <div className="workout-info">
                        <span>🏋️ 6 ejercicios</span>
                        <span>🕒 90 minutos</span>
                    </div>

                    <Link to="/rutinas/1" className="primary-button">
                        Ver Rutina
                    </Link>
                </article>

                <div className="side-cards">
                    <article className="small-card">
                        <h3>🎯 Objetivo</h3>
                        <strong>Hipertrofia</strong>
                    </article>

                    <article className="small-card">
                        <h3>🔥 Racha actual</h3>
                        <strong>12</strong>
                        <span>días</span>
                    </article>
                </div>

            </div>

            <article className="weight-card">
                <h2>Seguimiento de pesos:</h2>

                <div className="weight-content">
                    <div className="weight-data">
                        <p>Peso inicial: <strong>78kg</strong></p>
                        <p>Peso actual: <strong>78.4kg</strong></p>
                        <p>Último cambio: <strong>+0.4kg</strong></p>
                        <p>Meta: <strong>82kg</strong></p>
                    </div>

                    <div className="fake-chart">
                        📈
                    </div>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>

                <span className="progress-label">Progreso 60%</span>
            </article>

        </section>
    );
}

export default DashboardPage;