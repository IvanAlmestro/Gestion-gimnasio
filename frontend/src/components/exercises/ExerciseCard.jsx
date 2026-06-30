function ExerciseCard({ name, muscleGroup }) {
    return (
        <article className="exercise-card">
            <h3>{name}</h3>
            <p>{muscleGroup}</p>

            <button className="exercise-card-button">
                Ver
            </button>
        </article>
    );
}

export default ExerciseCard;