function ExerciseCard({ exercise, onView }) {
    return (
        <article className="exercise-card">
            <h3>{exercise.nombre}</h3>
            <p>{exercise.grupoMuscular}</p>

            <button
                className="exercise-card-button"
                onClick={() => onView(exercise)}
            >
                Ver
            </button>
        </article>
    );
}

export default ExerciseCard;