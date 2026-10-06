import { Link } from "react-router-dom";

function NextWorkoutCard({rutina}) {
    if (!rutina) {
        return (
            <article className="next-workout-card">
                <h2>🔥 Próximo entrenamiento</h2>
                <p>No tenés ninguna rutina marcada como activa.</p>
                <Link to="/rutinas" className="primary-button">
                    Elegir una rutina 📌
                </Link>
            </article>
        );
    }
    const id = rutina.id || rutina.idRutina;
    const cantidadEjercicios = rutina.diasRutina?.reduce((total, dia) => total + (dia.ejercicios?.length || 0), 0) || 0;
    return (
        <article className="next-workout-card">
            <h2>🔥 Próximo entrenamiento</h2>

            {/* Inyectamos las variables reales del objeto */}
            <h3>{rutina.nombre}</h3>

            <p>{rutina.objetivo || "Entrenamiento general"}</p>

            <div className="workout-info">
                <span>🏋️ {cantidadEjercicios} ejercicios</span>
                <span>🕒 {rutina.duracion || "60"} min aprox</span>
                <span> Proximo dia: {rutina.proximoDiaIndice+1}</span>
            </div>

            <Link
                to={`/rutinas/${id}?dia=${rutina.proximoDiaIndice || 0}`}
                className="primary-button"
            >
                Ir a entrenar 🚀
            </Link>
        </article>
    );
}

export default NextWorkoutCard;