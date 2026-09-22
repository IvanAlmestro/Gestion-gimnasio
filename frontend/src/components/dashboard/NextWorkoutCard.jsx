import { Link } from "react-router-dom";

function NextWorkoutCard() {
    return (
        <article className="next-workout-card">
            <h2>🔥 Próximo entrenamiento</h2>

            <h3>Nombre rutina</h3>

            <p>Pecho • Hombros • Tríceps</p>

            <div className="workout-info">
                <span>🏋️ 6 ejercicios</span>
                <span>🕒 90 minutos</span>
            </div>

            <Link to="/rutinas/4" className="primary-button">
                Ver Rutina
            </Link>
        </article>
    );
}

export default NextWorkoutCard;